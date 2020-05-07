provider "aws" {
  version = "~> 2.46"
  region  = "us-east-1"
}

terraform {
  backend "s3" {
    bucket               = "mlo-terraform"
    key                  = "terraform.tfstate"
    region               = "us-east-1"
    workspace_key_prefix = "workspaces/mlo.io"
    encrypt              = true
  }
}

# S3 config
resource "aws_s3_bucket" "site" {
  bucket = var.site_domain

  website {
    index_document = var.site_index_document
    error_document = var.site_error_document
  }
}

resource "aws_s3_bucket" "www_redirect" {
  bucket = "www.${var.site_domain}"

  website {
    redirect_all_requests_to = "https://${var.site_domain}"
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site_public_access.json
}

data "aws_iam_policy_document" "site_public_access" {
  statement {
    sid       = "PublicAccess"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.site.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

# ACM
resource "aws_acm_certificate" "cert" {
  domain_name       = var.site_domain
  validation_method = "NONE"

  lifecycle {
    create_before_destroy = true
  }
}

# CloudFront
locals {
  s3_origin_id = "${var.site_domain}-S3-origin"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.site.website_endpoint
    origin_id   = local.s3_origin_id

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  aliases = [var.site_domain]

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = var.site_index_document

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    min_ttl                = 3600     # 1 hour
    max_ttl                = 31536000 # 1 year
    default_ttl            = 86400    # 1 day
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    error_caching_min_ttl = 300
    response_page_path    = "/${var.site_error_document}"
  }
}

# Route53
resource "aws_route53_zone" "dns" {
  name    = var.site_domain
  comment = ""
}

resource "aws_route53_record" "apex" {
  zone_id = aws_route53_zone.dns.zone_id
  name    = "${var.site_domain}."
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.dns.zone_id
  name    = "www.${var.site_domain}"
  type    = "A"

  alias {
    name                   = aws_s3_bucket.www_redirect.website_domain
    zone_id                = aws_s3_bucket.www_redirect.hosted_zone_id
    evaluate_target_health = false
  }
}
