run-dev:
	docker compose up --build -d 
run-prod:
	docker compose -f docker-compose.prod.yaml up --build -d
down:
	docker compose down

.PHONY: run-dev run-prod down
