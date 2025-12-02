setup: build db-create db-migrate db-seed

build:
	docker compose build

run:
	docker c	docker compose run --rm backend_rails rails db:seedompose up

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
