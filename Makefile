SHELL := /bin/bash

help:
	@echo "+ $@"
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m%s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help

##
## Jekyll
##---------------------------------------------------------------------------

setup: ## Setup project
	@echo "+ $@"
	@npm install
.PHONY: setup

dev: ## Serve the project
	@echo "+ $@"
	@npm start
.PHONY: dev

draft: ## Create a new draft
	@echo "+ $@"
	@read -e -p "Draft name: " draftname && bundle exec jekyll draft "$$draftname"
.PHONY: draft

##
## Infrastructure
##---------------------------------------------------------------------------

tf-lint: ## Format & lint Terraform files
	tflint infra
	terraform fmt -recursive infra
.PHONY: tf-lint

tf-init: ## Initialize Terraform
	@cd infra && terraform init
.PHONY: tfinit

tf-plan: infra/.tfplan ## Create a Terraform plan
.PHONY: tf-plan

tf-apply: ## Apply a Terraform plan
	@test -f infra/tfplan || (echo 'Run "make tf-plan" first' && exit 1)
	@cd infra && terraform apply .tfplan && rm .tfplan
.PHONY: tf-apply

infra/.tfplan: infra/main.tf
	@cd infra && terraform plan -out=.tfplan
