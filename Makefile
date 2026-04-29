# ============================================================
# ポート定義
# ============================================================
PORT_REACT     ?= 3000
PORT_RAILS     ?= 7777
PORT_GO        ?= 1099
PORT_RAILS_DB  ?= 5432
PORT_GO_DB     ?= 15432
PORT_NGINX     ?= 8080

setup: init-backend-env build db-create db-migrate db-seed

build:
	docker compose build

down:
	docker compose down

db-create:
	docker compose run --rm backend_rails rails db:create

db-migrate:
	docker compose run --rm backend_rails rails db:migrate

db-seed:
	docker compose run --rm backend_rails rails db:seed

rspec:
	docker compose run --rm backend_rails bundle exec rspec

# ============================================================
# メイン起動コマンド
#   React は常に http://localhost:8080 (Nginx) に接続し
#   Nginx が Rails または Go に振り分ける
# ============================================================

# React + Rails + Nginx を一括起動
run-rails:
	$(MAKE) switch-rails
	docker compose up -d db
	docker compose run --rm backend_rails rails db:create db:migrate db:seed
	docker compose up backend_rails react nginx

# React + Go + Nginx を一括起動
# ※ Go サーバーはホストで起動するため、別途 make go-up を実行してください
run-go:
	$(MAKE) switch-go
	docker compose up react nginx

# ============================================================
# Rails サーバー操作
# ============================================================

# Railsサーバーおよび DB コンテナ・ボリュームを削除する
rails-down:
	docker compose down -v --remove-orphans

# Rails の DB データのみ削除 (テーブル構造は保持)
rails-db-reset:
	docker compose run --rm backend_rails rails db:truncate_all

# ============================================================
# Go サーバー (port: 1099): DB起動 → schema適用 → seed → サーバー起動 / 削除
# ============================================================

# Goサーバーを DB起動・schema適用・seed投入してから起動する
go-up:
	-lsof -ti:1099 | xargs kill -9 2>/dev/null || true
	cd submodules/backend/go && \
	set -a && . ./.envrc && set +a && \
	docker compose up -d db && \
	docker compose exec db sh -c 'until pg_isready -U "$$POSTGRES_USER"; do sleep 1; done' && \
	PGPASSWORD="$${DB_PASSWORD}" psqldef -U "$${DB_USER}" -h "$${DB_HOST}" -p "$${DB_PORT}" "$${DB_NAME}" < internal/infrastructure/db/schema.sql && \
	go run ./tools/seed/main.go && \
	go run ./cmd/...

# GoサーバーのDBコンテナ・ボリュームを削除する
go-down:
	cd submodules/backend/go && docker compose down -v --remove-orphans

# Go の DB データのみ削除 (ボリュームごと削除して再作成)
go-db-reset:
	cd submodules/backend/go && \
	set -a && . ./.envrc && set +a && \
	docker compose down -v && \
	docker compose up -d db && \
	docker compose exec db sh -c 'until pg_isready -U "$$POSTGRES_USER"; do sleep 1; done' && \
	PGPASSWORD="$${DB_PASSWORD}" psqldef -U "$${DB_USER}" -h "$${DB_HOST}" -p "$${DB_PORT}" "$${DB_NAME}" < internal/infrastructure/db/schema.sql

# ============================================================
# Nginx バックエンド切り替え
# ============================================================

# .backend.env が無ければ Rails をデフォルトで作成
init-backend-env:
	@if [ ! -f .backend.env ]; then \
		cp .backend.env.example .backend.env; \
		echo "✅ .backend.env を作成しました (デフォルト: Rails)"; \
	fi

# 現在どちらのバックエンドが有効か確認
backend-status:
	@echo ">>> 現在のバックエンド設定:"
	@cat .backend.env 2>/dev/null || echo "(未設定: デフォルト Rails)"

# Rails バックエンドに切り替え（nginx を再作成して反映）
switch-rails:
	@echo "BACKEND_URL=http://backend_rails:7777" > .backend.env
	@if docker ps --format "{{.Names}}" | grep -q "nginx"; then \
		docker compose up -d --force-recreate nginx; \
	else \
		echo "⚠️  nginx is not running. Start with make run-rails."; \
	fi
	@echo "✅ Rails バックエンドに切り替えました (port: 7777)"

# Go バックエンドに切り替え（nginx を再作成して反映）
# ※ Go は host で go run しているため host.docker.internal 経由でアクセス
switch-go:
	@echo "BACKEND_URL=http://host.docker.internal:1099" > .backend.env
	@if docker ps --format "{{.Names}}" | grep -q "nginx"; then \
		docker compose up -d --force-recreate nginx; \
	else \
		echo "⚠️  nginx is not running. Start with make run-go."; \
	fi
	@echo "✅ Go バックエンドに切り替えました (port: 1099)"

# ============================================================
# curl 比較: 起動中のサーバーに叩く
#   使い方例:
#     make curl-compare                        # GET /api/v1/date_spots
#     make curl-compare PATH=/api/v1/users     # パス変更
#     make curl-compare QUERY="prefecture_id=1"
# ============================================================
RAILS_BASE ?= http://localhost:7777
GO_BASE    ?= http://localhost:1099
PATH       ?= /api/v1/date_spots
METHOD     ?= GET
QUERY      ?=
BODY       ?=

curl-compare:
	bash scripts/curl-compare.sh "$(METHOD)" "$(PATH)" "$(QUERY)" "$(BODY)"

# ============================================================
# 全サーバーのポートを kill する
#   対象ポート:
#     - React     : 3000
#     - Rails     : 7777
#     - Go        : 1099
#     - Rails DB  : 5432
#     - Go DB     : 15432
#     - Nginx     : 8080
# ============================================================
kill-all-ports:
	@for port in $(PORT_REACT) $(PORT_RAILS) $(PORT_GO) $(PORT_RAILS_DB) $(PORT_GO_DB) $(PORT_NGINX); do \
		pids=$$(lsof -ti:$$port 2>/dev/null); \
		if [ -n "$$pids" ]; then \
			echo "🔪 port $$port を使用しているプロセス (PID: $$pids) を kill します"; \
			echo "$$pids" | xargs kill -9; \
		else \
			echo "✅ port $$port は使用されていません"; \
		fi; \
	done
	@echo "✅ 全ポートの kill が完了しました"

# ============================================================
# Submodule shells - open an interactive shell in each submodule
# Usage: make shell-go  (or shell-rails, shell-react)
# ============================================================

shell-go:
	@cd submodules/backend/go && /bin/zsh -l

shell-rails:
	@cd submodules/backend/rails && /bin/zsh -l

shell-react:
	@cd submodules/frontend/react && /bin/zsh -l

# ============================================================
# curl 比較: Rails と Go を両方起動してから叩く
#   両サーバー起動 → 比較 → 両サーバー停止
# ============================================================
curl-compare-with-servers:
	@echo ">>> Starting Rails server..."
	docker compose up -d db
	docker compose run --rm backend_rails rails db:create db:migrate db:seed
	docker compose up -d backend_rails
	@echo ">>> Starting Go server..."
	cd submodules/backend/go && \
	  docker compose up -d db && \
	  docker compose exec db sh -c 'until pg_isready -U "$$POSTGRES_USER"; do sleep 1; done' && \
	  PGPASSWORD="$${DB_PASSWORD}" psqldef -U "$${DB_USER}" -h "$${DB_HOST}" -p "$${DB_PORT}" "$${DB_NAME}" < internal/infrastructure/db/schema.sql && \
	  go run ./tools/seed/main.go && \
	  go run ./cmd/... &
	@echo ">>> Waiting for servers to be ready..."
	@until curl -sf http://localhost:7777/api/v1/top > /dev/null; do sleep 1; done
	@until curl -sf http://localhost:1099/api/v1/top > /dev/null; do sleep 1; done
	@echo ">>> Both servers ready. Running comparison..."
	bash scripts/curl-compare.sh "$(METHOD)" "$(PATH)" "$(QUERY)" "$(BODY)"
	@echo ">>> Stopping Go server..."
	pkill -f "date-courses-go\|go run.*cmd" 2>/dev/null || true
	@echo ">>> Stopping Rails server..."
	docker compose down -v --remove-orphans
	@cd submodules/backend/go && docker compose down -v --remove-orphans
