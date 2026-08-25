# ============================================================
# ポート定義
# ============================================================
PORT_REACT     ?= 3000
PORT_GO        ?= 1099
PORT_GO_DB     ?= 15432
# Rails 停止に伴い未使用
# PORT_RAILS     ?= 7777
# PORT_RAILS_DB  ?= 5432
# PORT_NGINX     ?= 8080

# direnv を使っていないシェルでも動くように、ルートの .envrc を読んでから docker compose を叩く
COMPOSE = set -a && . ./.envrc && set +a && docker compose

build:
	@$(COMPOSE) build

# ============================================================
# メイン起動コマンド (Go + React)
#   React は http://localhost:1099 の Go バックエンドを直接叩く
#
#   make up    : Go と React をまとめて起動する (停止は Ctrl+C)
#   make down  : Go と React をまとめて停止する
#
#   ターミナルを分けて動かしたい場合:
#     ターミナル1: make go-up      # Go サーバー (DB・schema・seed 込み)
#     ターミナル2: make run-react  # React 開発サーバー
# ============================================================

# Go + React を1コマンドで起動する
#   Go のログには [go]、React のログには [react] を頭につけて1画面に流す
#   Ctrl+C で両方まとめて停止する
up:
	@echo ">>> Go + React を起動します (停止は Ctrl+C)"
	@trap '$(MAKE) --no-print-directory down' INT TERM; \
	( $(MAKE) --no-print-directory -s go-up 2>&1 | sed -l 's/^/[go]    /' ) & \
	( $(COMPOSE) up react 2>&1 | sed -l 's/^/[react] /' ) & \
	wait

# Go と React を停止する (Go の DB コンテナは残す。消す場合は make go-down)
down:
	@lsof -ti:$(PORT_GO) | xargs kill -9 2>/dev/null || true
	@$(COMPOSE) down --remove-orphans
	@echo "✅ Go と React を停止しました (Go の DB は起動したままです)"

# React 開発サーバーを起動する
run-react:
	@$(COMPOSE) up react

# 旧名のエイリアス (Nginx を廃止したため React のみ起動する)
run-go: run-react

# ============================================================
# Go サーバー (port: 1099): MySQL起動 → schema適用(mysqldef) → seed → サーバー起動 / 削除
# ============================================================

# Goサーバーを DB起動・schema適用・seed投入してから起動する
go-up:
	-lsof -ti:1099 | xargs kill -9 2>/dev/null || true
	cd submodules/backend/go && \
	set -a && . ./.envrc && set +a && \
	docker compose up -d db && \
	docker compose exec db sh -c 'until mysql -u root -p"$$MYSQL_ROOT_PASSWORD" -e "SELECT 1" >/dev/null 2>&1; do sleep 1; done' && \
	mysqldef -u "$${DB_USER}" -p"$${DB_PASSWORD}" -h "$${DB_HOST}" -P "$${DB_PORT}" "$${DB_NAME}" < internal/infrastructure/db/schema.sql && \
	go run ./tools/seed/main.go && \
	go run ./cmd/api

# GoサーバーのDBコンテナ・ボリュームを削除する
go-down:
	cd submodules/backend/go && docker compose down -v --remove-orphans

# Go の DB データのみ削除 (ボリュームごと削除して再作成)
go-db-reset:
	cd submodules/backend/go && \
	set -a && . ./.envrc && set +a && \
	docker compose down -v && \
	docker compose up -d db && \
	docker compose exec db sh -c 'until mysql -u root -p"$$MYSQL_ROOT_PASSWORD" -e "SELECT 1" >/dev/null 2>&1; do sleep 1; done' && \
	mysqldef -u "$${DB_USER}" -p"$${DB_PASSWORD}" -h "$${DB_HOST}" -P "$${DB_PORT}" "$${DB_NAME}" < internal/infrastructure/db/schema.sql

# ============================================================
# 全サーバーのポートを kill する
#   対象ポート:
#     - React     : 3000
#     - Go        : 1099
#     - Go DB     : 15432
# ============================================================
kill-all-ports:
	@for port in $(PORT_REACT) $(PORT_GO) $(PORT_GO_DB); do \
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
# Usage: make shell-go  (or shell-react)
# ============================================================

shell-go:
	@cd submodules/backend/go && /bin/zsh -l

shell-react:
	@cd submodules/frontend/react && /bin/zsh -l

# ============================================================
# 以下は Rails リプレイス完了により停止中
#   Go + React のみで起動するため、Rails / Nginx 関連をすべて無効化
#   Rails に戻す場合は compose.yml のコメント解除と合わせて復活させること
# ============================================================

# --- Rails セットアップ・DB 操作 ---
# setup: init-backend-env build db-create db-migrate db-seed
#
# db-create:
# 	docker compose run --rm backend_rails rails db:create
#
# db-migrate:
# 	docker compose run --rm backend_rails rails db:migrate
#
# db-seed:
# 	docker compose run --rm backend_rails rails db:seed
#
# rspec:
# 	docker compose run --rm backend_rails bundle exec rspec
#
# # Railsサーバーおよび DB コンテナ・ボリュームを削除する
# rails-down:
# 	docker compose down -v --remove-orphans
#
# # Rails の DB データのみ削除 (テーブル構造は保持)
# rails-db-reset:
# 	docker compose run --rm backend_rails rails db:truncate_all
#
# # React + Rails + Nginx を一括起動
# run-rails:
# 	$(MAKE) switch-rails
# 	docker compose up -d db
# 	docker compose run --rm backend_rails rails db:create db:migrate db:seed
# 	docker compose up backend_rails react nginx
#
# shell-rails:
# 	@cd submodules/backend/rails && /bin/zsh -l

# --- Nginx バックエンド切り替え ---
# # .backend.env が無ければ Rails をデフォルトで作成
# init-backend-env:
# 	@if [ ! -f .backend.env ]; then \
# 		cp .backend.env.example .backend.env; \
# 		echo "✅ .backend.env を作成しました (デフォルト: Rails)"; \
# 	fi
#
# # 現在どちらのバックエンドが有効か確認
# backend-status:
# 	@echo ">>> 現在のバックエンド設定:"
# 	@cat .backend.env 2>/dev/null || echo "(未設定: デフォルト Rails)"
#
# # Rails バックエンドに切り替え（nginx を再作成して反映）
# switch-rails:
# 	@echo "BACKEND_URL=http://backend_rails:7777" > .backend.env
# 	@if docker ps --format "{{.Names}}" | grep -q "nginx"; then \
# 		docker compose up -d --force-recreate nginx; \
# 	else \
# 		echo "⚠️  nginx is not running. Start with make run-rails."; \
# 	fi
# 	@echo "✅ Rails バックエンドに切り替えました (port: 7777)"
#
# # Go バックエンドに切り替え（nginx を再作成して反映）
# # ※ Go は host で go run しているため host.docker.internal 経由でアクセス
# switch-go:
# 	@echo "BACKEND_URL=http://host.docker.internal:1099" > .backend.env
# 	@if docker ps --format "{{.Names}}" | grep -q "nginx"; then \
# 		docker compose up -d --force-recreate nginx; \
# 	else \
# 		echo "⚠️  nginx is not running. Start with make run-go."; \
# 	fi
# 	@echo "✅ Go バックエンドに切り替えました (port: 1099)"

# --- Rails と Go のレスポンス比較 ---
# RAILS_BASE ?= http://localhost:7777
# GO_BASE    ?= http://localhost:1099
# PATH       ?= /api/v1/date_spots
# METHOD     ?= GET
# QUERY      ?=
# BODY       ?=
#
# # 使い方例:
# #   make curl-compare                        # GET /api/v1/date_spots
# #   make curl-compare PATH=/api/v1/users     # パス変更
# #   make curl-compare QUERY="prefecture_id=1"
# curl-compare:
# 	bash scripts/curl-compare.sh "$(METHOD)" "$(PATH)" "$(QUERY)" "$(BODY)"
#
# # 両サーバー起動 → 比較 → 両サーバー停止
# curl-compare-with-servers:
# 	@echo ">>> Starting Rails server..."
# 	docker compose up -d db
# 	docker compose run --rm backend_rails rails db:create db:migrate db:seed
# 	docker compose up -d backend_rails
# 	@echo ">>> Starting Go server..."
# 	cd submodules/backend/go && \
# 	  docker compose up -d db && \
# 	  docker compose exec db sh -c 'until mysqladmin ping -u root -p"$$MYSQL_ROOT_PASSWORD" --silent 2>/dev/null; do sleep 1; done' && \
# 	  mysqldef -u "$${DB_USER}" -p"$${DB_PASSWORD}" -h "$${DB_HOST}" -P "$${DB_PORT}" "$${DB_NAME}" < internal/infrastructure/db/schema.sql && \
# 	  go run ./tools/seed/main.go && \
# 	  go run ./cmd/api &
# 	@echo ">>> Waiting for servers to be ready..."
# 	@until curl -sf http://localhost:7777/api/v1/top > /dev/null; do sleep 1; done
# 	@until curl -sf http://localhost:1099/api/v1/top > /dev/null; do sleep 1; done
# 	@echo ">>> Both servers ready. Running comparison..."
# 	bash scripts/curl-compare.sh "$(METHOD)" "$(PATH)" "$(QUERY)" "$(BODY)"
# 	@echo ">>> Stopping Go server..."
# 	pkill -f "date-courses-go\|go run.*cmd" 2>/dev/null || true
# 	@echo ">>> Stopping Rails server..."
# 	docker compose down -v --remove-orphans
# 	@cd submodules/backend/go && docker compose down -v --remove-orphans
