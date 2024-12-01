setup: build start_project close_project db-create db-migrate db-seed

build:
	docker-compose build

start_project:
	docker-compose up

close_project:
	docker-compose down

db-create:
	docker-compose exec backend_rails rails db:create

db-migrate:
	docker-compose exec backend_rails rails db:migrate

db-seed:
	docker-compose exec backend_rails rails db:seed
