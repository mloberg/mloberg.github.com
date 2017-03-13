---
layout: post
title: Getting Around CORS in CloudFront
category: devops
---
We ran into an issue at work the other day with CloudFront and S3. We were trying to load assets via Ajax from our CloudFront distribution, but kept getting an "Origin http://example.com is not allowed by Access-Control-Allow-Origin" error. There is a W3 spec called CORS (Cross-Origin Resource Sharing) that prevents retrieving data from another site. To get around this, you would normally set an "Access-Control-Allow-Origin" header, but S3 limits the headers you can set, and that's not one of them.
I'm not the [only one](http://blog.jacobelder.com/2012/05/3-problems-aws-needs-to-address/) who finds this problem annoying. Amazon has said there are plans to implement this feature, but they also said that two years ago..

I couldn't wait around for this fix to come about (if it ever does), so I looked at other options; using another CDN, building my own CDN. Then this morning I came across an article on Hacker News called [How we use Amazon CloudFront for dynamically generated content](http://blog.elastic.io/post/22773181715/how-we-use-amazon-cloudfront-for-dynamically-generated). By default, CloudFront's origin server is an S3 bucket, but there is an option for setting a custom origin. This means you can set up your own server to use as a CloudFront origin server. I spun up an EC2 instance with nginx and the "Access-Control-Allow-Origin" header. Then I created a new CloudFront distribution and set the instance as the origin. I reloaded the page, and it loaded the asset.
While there are other issues with CloudFront (SSL with CNAMEs), this makes it more usable.
