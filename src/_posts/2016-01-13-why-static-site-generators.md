---
layout: post
title: Why Static Site Generators
category: jekyll
excerpt: >
  In this post we'll talk about what static sites are and the benefits and
  drawbacks compared to "normal" site.
redirect_from: /blog/2016/01/13/why-static-site-generators.html
hero:
  image: assets/images/hero-znT2Mwt9ypo.jpg
  photographer: rawpixel
  link: https://unsplash.com/photos/znT2Mwt9ypo
---
This is a 3 part series about static site generators and [Jekyll][jekyll] in
specific.

1. Why Static Site Generators (_You are here_)
2. [Getting Starting With Jekyll]({% post_url 2016-01-27-getting-started-with-jekyll %})
3. [Advance Jekyll]({% post_url 2016-11-15-advance-jekyll %})

What the hell is a static site generator? First we need to understand how most
web sites work. Most web sites you visit are dynamic sites, which means the
content is generated at request time. This could include calls to a database, a
third party service, or other processes that could take time to processes.

A static site is just static content (HTML, CSS, JavaScript). Nothing is
generated, no database calls are made. Static content is simply returned. That
means these sites perform better because serving static content is a lot easier
on the web server.

A static site generator builds those static files from different templates or
scripts and can make managing a static site a lot easier than having to update
each HTML page if you make a change to some layout element.

In fact, this site you are looking at is a static site. There is no database,
just static files. I'm using a tool call [Jekyll][jekyll], that I'll be talking
about more in-depth in later posts.

## Why Should I Care?

As a web developer, my personal site has gone through many different systems.
For a while it was a WordPress site, at a different time it was a custom built
application. A couple years ago I made the switch to Jekyll and I haven't looked
back. I'm going to give you just 5 reasons why static sites and Jekyll is
awesome, although I think there are many more benefits than this.

### 1. No Servers

I think my favorite thing about how I've hosted my site since switching to
Jekyll is that I haven't need to manage or maintain a server. I used
[Github Pages][gh-pages] for a while, and now I'm using Amazon S3 and
CloudFront. No having to worry about setting up a server and making sure it's up
or Apache is working.

You could host your static site on your servers, but there are plenty of options
out there, where you don't need to.

### 2. No Upgrades

I think one of the worst things when I had a WordPress site are the constant
updates. With Jekyll I don't have any software on the server that I have to
worry about upgrading, and I don't even need to upgrade Jekyll unless I want to.

### 3. No Security Worries

WordPress is always getting updates because of security vulnerabilities being
discovered. Or what about a custom application, who knows what security issues
could be lurking in there. Because Jekyll is just static files, there's no
scripts that are ran on the server.

This also goes for server software. Because I'm not running my own server, I
don't have to worry about making sure Apache or nginx or whatever other software
is update to date.

### 4. No Downtime

How many times have you seen an article featured on Reddit or Hacker News that
you visit and it's unavailable because it wasn't able to support the influx of
traffic. Or if something in your code breaks, or some configuration on your
server gets messed up, there goes your site. With static sites, handling that
influx of traffic is a lot easier and Apache can handle it a lot better than
dynamic sites where the issue is usually with the database.

If you use a service like Github Pages\* or host your site on Amazon CloudFront
or some other CDN, you don't even have to worry about making sure Apache or
nginx can handle that.

\* There have been cases in the past where I have experienced downtime with
Github Pages, which is why I moved to S3 and CloudFront. Downtime usually only
last a couple minutes at most.

### 5. No Costs

Assuming you're not counting your domain registration and you are using Github
Pages, hosting a site that uses Jekyll is free. Even with my site now that uses
S3, CloudFront, and Route 53, I only pay $2.50/month and that's including all
the other things I have on S3.

## Potential Downfalls

But Matt, I can't switch my site over to a static site. My site needs to have...

### 1. Comments

Scroll down to the bottom of this page, what is that you see? Comments?!? How
can it be? Thanks to a really awesome service called [Disqus][disqus], you can
have comments using just JavaScript.

### 2. Real Time Content

An old version of my site used to pull in my [Twitter][twitter] feed and also my
[Last.fm][lastfm] tracks. When I switched over to Jekyll I was able to pull in
this data with JavaScript. I'm not sure how viable this option is as your API
keys may need to be in JavaScript or you could hit API limits. Do you really
need this information pulled in on your site? It is nice, but with all the other
benefits of static sites, you could probably get by without this.

### 3. Admin UI

With WordPress it was nice being able to login from anywhere and write a new
post or continue working on a draft. You can't possibly do that with a static
site generator? Wrong! With my current site, I'm able to use Github's UI to
create new files or make changes to existing files. If you're using Github Pages
or a deploy system like my site, any changes that are make will automatically
get built and deployed. I've even seen iPhone and Android apps that allow you
to do the same thing assuming your site code is in a Github repo.

## Making The Switch

I hope I've at least interested you in static site generators. In the
[next post]({% post_url 2016-01-27-getting-started-with-jekyll %}) I'm going to
walk through setting up a Jekyll site and Github Pages.

[jekyll]: http://jekyllrb.com/
[gh-pages]: https://pages.github.com/
[disqus]: https://disqus.com/
[twitter]: https://twitter.com/mloberg
[lastfm]: http://www.last.fm/user/mloberg
