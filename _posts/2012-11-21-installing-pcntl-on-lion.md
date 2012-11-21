---
layout: blog
title: Installing pcntl On Lion
description: Install the pcntl PHP module on OS X Lion.
---
I needed the [pcntl](http://www.php.net/manual/en/book.pcntl.php) module for a project I'm working on in PHP. By default this module is not installed when you install PHP, so you'll need to compile it. There is a brew package for it, but I couldn't get it to work, and I think it's just as simple to compile it.

First you'll need to download the PHP source. Run `php -v` to get your PHP version and browse the [PHP releases page](http://www.php.net/releases/) for your version. In my case it was 5.3.10.

{% highlight bash %}
curl -o php-5.3.10.tar.gz http://us1.php.net/distributions/php-5.3.10.tar.gz
tar xzvf php-5.3.10.tar.gz
cd php-5.3.10/ext/pcntl
phpize
./configure --enable-pcntl
{% endhighlight %}

Some people reported that they got an error while running ./configure. I did not run into this issue, but if you do, you'll need to specify your system architecture.

{% highlight bash %}
CFLAGS='-arch x86_64' CXXFLAGS='-arch x86_64' LDFLAGS='-arch x86_64' ./configure --enable-pcntl
{% endhighlight %}

Now just run `make`, and the pcntl module will be compile to *modules/pcntl.so*. Copy this to your PHP extensions directory (*/usr/lib/php/extensions/*), and enable the extension in php.ini by adding "extensions=pcntl.so".

If you are using Apache, you will need to restart it to take affect.
