setup: build db-create db-migrate db-seed

build:
	docker compose build

run:
	docker compose up

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
# Rails サーバー (port: 7777): DB起動 → seed → サーバー起動 / 削除
# ============================================================

# Railsサーバーを DB起動・seed投入してから起動する
rails-up:
	docker compose up -d db
	docker compose run --rm backend_rails rails db:create db:migrate db:seed
	docker compose up backend_rails

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
	cd submodules/backend/go && \
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
	docker compose down -v && \
	docker compose up -d db && \
	docker compose exec db sh -c 'until pg_isready -U "$$POSTGRES_USER"; do sleep 1; done' && \
	PGPASSWORD="$${DB_PASSWORD}" psqldef -U "$${DB_USER}" -h "$${DB_HOST}" -p "$${DB_PORT}" "$${DB_NAME}" < internal/infrastructure/db/schema.sql

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

