---
layout: post
title: Installing Memcache On Arch
category: devops
redirect_from: /blog/2011/11/02/installing-memcache-on-arch.html
---
This is a simple guide to get [Memcached](http://memcached.org/) and the Memcache/Memcached module(s) for PHP installed on Arch Linux.

One of the things I love about Arch is it's package manager. It's always up-to-date and has a lot of packages including all the packages we need to get Memcached running. To install memcache, simply run

{% highlight bash %}
pacman -S memcached
{% endhighlight %}

Memcached is now installed! Let's get it running.

{% highlight bash %}
memcached -d -m 512 -l 127.0.0.1 -p 11211 -u nobody
{% endhighlight %}

Let's go over this command:

* d: tells Memcached to run as a daemon
* m: the memory (Memcached uses actual memory and not disk memory)
* l: where to listen, here would only listen for local requests, if you want to allow other computers to access Memcached, specify the external IP
* p: the port, default 11211
* u: the user to run as

To make sure Memcached is running.

{% highlight bash %}
ps -eaf | grep memcached
{% endhighlight %}

To make sure that Memcached always starts on startup, add the command to /etc/rc.local.

Now that we have Memcached installed, we need to install the Memcache/Memcached modules for PHP installed. If you have PECL installed and configured, you can do it that way, or use pacman.

{% highlight bash %}
pacman -S php-memcache # or php-memcached for the Memcached module
{% endhighlight %}

Both of these commands will create a config file for the module in /etc/php/conf.d/. To enable the module you need to edit the config file (I used memcached, so edit /etc/php/conf.d/memcached.ini) and uncomment the line in there.

Finally run */etc/rc.d/httpd* restart and there you go, you can start using Memcached in PHP.
