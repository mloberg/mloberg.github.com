---
layout: post
title: Using Private Go Modules
categories: golang
hero:
  name: i6VBVfcerso
  photographer: Peter Conlan
  link: https://unsplash.com/photos/i6VBVfcerso
date: 2020-04-14 12:48 -0500
---
We've started to write some microservices in Go. In our PHP applications we use
[Satis](https://getcomposer.org/doc/articles/handling-private-packages-with-satis.md)
hosted on S3 to share common libraries. As long as you can access the S3 bucket,
you can install the packages. In Go this was a little more complex.

We use a self-hosted GitLab instance, so I've tailored these steps for that. But
the same thing should work for private GitHub repositories as well.

## Setup

The first thing you'll need to do is to create an access token. This token should
have both the __read_repository__ scope. If you are using this on a local machine,
you may need to also add the __write_repository__ scope if you're using HTTP to
access your repository.

![GitLab Token](/images/gitlab-token.png)

There's a couple options for fetching Go modules from private repositories. The
most common way I've seen recommended is using `git config url."".insteadOf ""`.
This works, but more elegant solution is using a `~/.netrc` file. This file
defines automatic logins for ftp, but other programs have also adopted it,
including Git.

    machine gitlab.company.com login USERNAME password TOKEN

Replace _gitlab.company.com_, _USERNAME_, and _TOKEN_ with your values. Now when
you push or pull via HTTPS in Git, it will use that information to login you in.
This is why you need the __write_repository__ scope for local purposes.

This will also work with GitHub, Bitbucket, or GitLab.com.

    machine github.com login USERNAME password TOKEN

One final thing that you'll have to do is set a [GOPRIVATE](https://golang.org/cmd/go/#hdr-Module_configuration_for_non_public_modules)
environment variable. This contains a comma-separated list of module prefixes.
Save this value to your `~/.bashrc` or `~/.zshrc`.

    export GOPRIVATE=gitlab.company.com

Now you can run `go get gitlab.company.com/go/pkg` and start pulling private
modules.

## Docker

To allow for installing private modules in a Docker image, we use build arguments
and create the `~/.netrc` file mentioned above.

Here is what our Dockerfile looks like.

```docker
FROM golang:1.13-alpine AS builder

ARG GITLAB_LOGIN
ARG GITLAB_TOKEN

WORKDIR /app

# Allow pulling private modules
RUN apk add --no-cache git
RUN echo "machine git.petfinder.com login ${GITLAB_LOGIN} password ${GITLAB_TOKEN}" > ~/.netrc

# prevent the reinstallation of vendors at every change in the source code
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# Copy and build the app
COPY . .
RUN go build -o bin/app .

FROM alpine:latest

COPY --from=builder /app/bin/app /app
RUN chown nobody: /app
USER nobody

CMD [ "/app" ]
```

Then when we build the Docker image we pass the arguments. Make sure you're using
a token with only the __read_repository__ scope otherwise changes could be pushed
from the Docker container.

    docker build --build-arg GITLAB_LOGIN=${GITLAB_LOGIN} --build-arg GITLAB_TOKEN=${GITLAB_TOKEN} company/app .

If you're using Docker Compose, you can pass the args in the build option.

```yaml
version: '3.7'
services:
  app:
    build:
      context: .
      target: builder
      args:
        GITLAB_LOGIN: ${GITLAB_LOGIN}
        GITLAB_TOKEN: ${GITLAB_TOKEN}
    image: company/app
    ports:
      - 8080:8080
    volumes:
      - ./:/app:cached
    command: go run ./main.go
```

## Continuous Integration

The same methodology applies to Continuous Integration. Again, make sure the
token you're using has only the __read_repository__ scope. You don't want to
accidentally push or give someone else access to your repositories.

We use GitLab CI, but the same should apply to other CI platforms like Circle
or Jenkins. In our `before_script`, we're crafting our `~/.netrc` file, pulling
values from CI/CD Variable configuration.

```yaml
.golang:
  image: golang:1.13
  before_script:
    - echo "machine git.petfinder.com login ${GITLAB_LOGIN} password ${GITLAB_TOKEN}" > ~/.netrc

test:unit:
  extends: .golang
  script: make test
```
