include .env

.DEFAULT_GOAL := start

start: clean
	docker-compose up -d assets jekyll
.PHONY: start

stop:
	docker-compose down
.PHONY: stop

draft:
	@test ${NAME}
	docker-compose run --rm jekyll jekyll draft ${NAME}
.PHONY: draft

proof:
	docker-compose run --rm assets npm run proof:drafts
.PHONY: proof

post:
	@test ${DRAFT}
	docker-compose run --rm jekyll jekyll publish ${DRAFT}
.PHONY: post

clean:
	rm -rf dist
	rm -rf src/assets
.PHONY: clean

build: clean
	docker-compose run --rm assets sh -c "npm install && npm run prod"
	docker-compose run --rm -e JEKYLL_ENV=production jekyll jekyll build
.PHONY: build

test:
	docker-compose run --rm jekyll jekyll doctor
	docker-compose run --rm jekyll htmlproofer ./dist --check-html --http-status-ignore 301,302 --url-ignore "/mlo.io/,/0.0.0.0/" --assume-extension
	docker-compose up -d mloio
	docker-compose run --rm test test
	docker-compose rm -fs mloio
.PHONY: test

test-report:
	npx backstopjs openReport
.PHONY: test-report

test-approve:
	docker-compose run --rm test approve
.PHONY: test-approve

publish: stop build test
	docker-compose run --rm jekyll jekyll algolia
	docker-compose run --rm deploy s3 sync . s3://${AWS_S3_BUCKET} --acl public-read --cache-control max-age=86400 --storage-class REDUCED_REDUNDANCY
	docker-compose run --rm deploy s3 cp s3://${AWS_S3_BUCKET}/assets/ s3://${AWS_S3_BUCKET}/assets/ --recursive --metadata-directive REPLACE --cache-control max-age=31536000 --storage-class REDUCED_REDUNDANCY --acl public-read
	docker-compose run --rm deploy cloudfront create-invalidation --distribution-id ${AWS_CF_DISTRIBUTION_ID} --paths '/*'
.PHONY: publish
