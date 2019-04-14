.DEFAULT_GOAL := help

.PHONY: up
up: clean ## Start development server
	docker-compose up -d

.PHONY: down
down: ## Stop development server
	docker-compose down

.PHONY: clean
clean: ## Cleanup build files
	rm -rf dist
	rm -rf src/assets

.PHONY: draft
draft: ## Start draft post
	@read -p "Draft name: " draft; \
	docker-compose run --rm jekyll jekyll draft $$draft

.PHONY: publish
publish: ## Publish a draft
	@ls src/_drafts
	@read -p "Draft: " draft; \
	docker-compose run --rm jekyll jekyll publish src/_drafts/$$draft.md

.PHONY: proof
proof: ## Proof drafts
	docker-compose run --rm assets npm run proof:drafts

.PHONY: help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
