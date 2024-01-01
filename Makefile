setup: build start_project close_project db-create db-migrate db-seed

build:
	docker-compose build

start_project:
	docker-compose up

close_project:
	docker-compose down

db-create:
	docker-compose exec backend rails db:create

db-migrate:
	docker-compose exec backend rails db:migrate

db-seed:
	docker-compose exec backend rails db:seed
