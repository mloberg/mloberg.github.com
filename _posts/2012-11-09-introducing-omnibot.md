---
layout: blog
title: Introducing OmniBot
---
Today I released OmniBot 0.2.1. OmniBot is an IRC chat bot written in NodeJS and CoffeeScript.

#### Some History

The company I worked for was using Google Talk (and still do), for chats. We would have launch nights every other Thursday, and need a group chat. We used GTalk for this, but it was a bit lacking. After throwing around the idea of using IRC for this, I setup a server, and tested it out. To this day we still use IRC.

After I got the server setup, I started working on a chat bot. I had worked with NodeJS a little before, but not enough to really do anything with. So I decided this was a chance to learn Node a little better as well. A couple weeks later I had a chat bot that would say hello when you joined a room and give you the weather conditions. I then built it to be a little more modular and released it as an npm package.

#### The New OmniBot

This past week I rewrote OmniBot from the ground up using CoffeeScript. I've used CoffeeScript for other projects before and I think it makes writing JavaScript a lot more simpler.

I've dropped all planned support for other chat types and have made OmniBot strictly IRC. If you are using another chat service, I would recommend checking out [Hubot](http://hubot.github.com/), GitHub's chat bot.

#### Getting Started

If you don't have CoffeeScript installed on your machine, you'll first need to install that.

{% highlight bash %}
npm install -g coffee-script
{% endhighlight %}

Next you'll want to install OmniBot and OmniBot-Modules npm packages.

{% highlight bash %}
npm install omnibot omnibot-modules
{% endhighlight %}

##### Writing The Bot

OmniBot is the actual chat bot, while OmniBot-Module is a collection of default modules for OmniBot (we'll get into writing our own in another post).

Now we need to create our script, I've named mine *bot.coffee*. We need to require *omnibot* and create a new instance of it.

{% highlight coffeescript %}
Robot = require 'omnibot'

irc =
  server: 'irc.example.com'
  channels: [ '#bot' ]

bot = new Robot 'RobotName', irc
{% endhighlight %}

The irc variable stores all of the IRC connection details. We'll be connecting to *irc.example.com* and the *#bot* channel. If you have an IRC server running on a different port, or have a password on your server, you would add those to the irc variable.

You can run the script by running `coffee bot.coffee` in the command line.

We now have a chat bot, but if we connect, we won't see our chat bot. That's because we need to start the bot before it will connect to the server.

{% highlight coffeescript %}
...
bot = new Robot 'RobotName', irc

bot.start()
{% endhighlight %}

Now if we connect, we'll see that our bot is connected, but if we try to interact with it, it won't do anything. That's because we don't have any modules loaded.

##### Loading Modules

Modules are ways to hook into OmniBot without modifing any of it's source. It also provides a lot of helpers to make things a bit easier. We'll get more into modules in a future post, what they look like and how to write our own. For now we'll use *omnibot-modules*, a collection of modules I have put together to use with OmniBot. There is a method already included that makes loading them easy.

We can either load the modules before we call start, or pass a callback to start, and load the modules right after it connects. In this case, we want the modules loaded before we start the bot.

{% highlight coffeescript %}
...
bot = new Robot 'RobotName', irc

modules = [ 'join', 'joke', 'weather' ]

bot.loadModules modules

bot.start()
...
{% endhighlight %}

As you can see, we pass any array of module names to the `loadModules` method. You can view a list of the modules on [OmniBot's website](http://omnibot.mlo.io/modules/) along with their commands.

Now if you say *RobotName joke*, it will respond with a joke.

There are some modules that have config options. The weather module is one of these. Using the `set` method we can set the config option.

{% highlight coffeescript %}
...
modules = [ 'join', 'joke', 'weather' ]

bot.set 'weather_zip', 55555

bot.loadModules modules
...
{% endhighlight %}

Now *RobotName weather* will give use the weather for the zip we set.

#### Host Your Own Chat Bot

I hope that gets you off the ground with OmniBot. I'll be writing another post about modules and more OmniBot features here soon that should allow you to do even more cool stuff. I'm also actively working on improving and adding new features to OmniBot.
