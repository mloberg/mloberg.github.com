---
layout: post
title: My Adventures With Ruby
categories: ruby
redirect_from: /blog/2011/12/22/my-adventures-with-ruby.html
---
A couple weeks ago, as I was finishing up my TFD v2, I started to look at learning another language. After deciding between Python and Ruby, I went with Ruby.

As a PHP developer I always thought Ruby fanboys were annoying and completely wrong about Ruby. But after working with Ruby for a couple days, I fell in love with the syntax. It's clean and makes sense.

When I learn something I have to build something to test it out, see if it actually works. At work the music computer we have has a lot of songs, but not a good way to add songs or play songs you want. So I decided to build a music manager that people could upload songs and queue songs to play from their browser. This project became known as Playr.

At first I was looking at Rails, but I've got some issues with Rails. The fact that people think Rails is a programming language shows you what kind of people are using Rails. Rails fanboys seem to be really dumb, opinionated, and think every other language is inferior. The fact that Rails is constantly changing is annoying too. By the time you learn Rails some core functionality has changed as therefore makes everything you know useless. **All that aside**, Rails powers some awesome sites, and I plan to learn Rails, but for this project, it wasn't the way to go.

If you don't use Rails for a Ruby web application, the next most popular choice is [Sinatra](http://www.sinatrarb.com/). Sinatra is a simple route-based application, and it's awesome. It's so easy to create a new route and there's a lot of features and extras that made it my choice for Playr.

Next up is the database. I know MySQL really well, so I went with MySQL. How to communicate with MySQL? ActiveRecord is a big one, but again, seemed to heavy and complex for what I was trying to do. I went with [DataMapper](http://datamapper.org/), which is awesome. I honestly don't miss writing SQL queries.

Next I needed a way to authenticate multiple users. There are a couple of Sinatra plugins/middle-ware, but I decided to write my own. I used [ruby-bcrypt](https://rubygems.org/gems/bcrypt-ruby) and wrote a simple class that validates the user and writes a session cookie. Then I added an auth condition to the routes I wanted to protect.

There was three things that Playr needed to do and needed to do well. It needs to be able to play songs, it needs a queue songs, and probably most importantly, it needs to be able to upload songs. I started working on the upload first because with out the upload, the other things can't happen. I wanted to be able to have a multi-file ajax upload. My JavaScript library of choice [MooTools](http://mootools.net/) doesn't allow for ajax file uploads natively. I went with [qqFileUploader](https://github.com/valums/file-uploader). They offered a PHP script to upload files, but Ruby was nowhere to be found. After a little digging and experimenting, I finally got it to [work](https://gist.github.com/1486200). To get the ID3 tags off mp3, I used [mp3info](https://rubygems.org/gems/ruby-mp3info). Then I worked on a way to browse through artist/album/track and add the track to a queue. I couldn't figure out how to play tracks and make sure it kept playing, so while I was digging around for an answer I started adding more features to Playr.

[Last.fm](http://last.fm/) has a great API, and building a music service why wouldn't you use Last.fm's API? I added a way to browse artists and albums and pulled information from Last.fm. There wasn't a good gem for Last.fm, so I built my own class. I used [HTTParty](https://rubygems.org/gems/httparty) and built a simple class to get album, artist, and track information. Later I added the ability to scrobble tracks.

The API calls were adding some time to page loads (this would be accessed locally), so I needed a caching system to keep page load time down. [Redis](http://redis.io/) is an awesome (and fast) key-value store. I used [sinatra-redis](https://github.com/bmizerany/sinatra-redis) to interface with Redis.

Next I added some edit functionality to tracks (the genre on my Coldplay tracks weren't coming in right), and while I was at it, I added the ability for users to like/dislike tracks. Keeping with the user changes I added a list of user likes.

After a week of searching around, I finally figured out how to implement the worker class that would play and pause tracks (I used afplay to play tracks). This was the hardest part of the project. Trying to manage a process that continually plays tracks and that shutdowns properly was a challenge. With PHP I never had to worry about threads, forks, or processes. I eventually got it all figured out and it runs great.

This past week I was putting the finishing touches on Playr. This included adding some JS to make everything look smoother and setting some production specific settings. To keep page load time down, I added a script that would take all static assets and compress them into one file. Then I added [sinatra-cache-assets](https://github.com/ddollar/sinatra-cache-assets) to set caching headers for the files. The result is a quick loading app.

I wanted a way for users to get the track that's playing without having to reload the queue page, so I added some web socket magic that updated users of the currently playing song in the web app. That got me thinking of how I could update people on their desktop of the currently playing song. I did a little research on Growl and found a way to use Ruby and web sockets to push updates to Growl.

Three weeks after starting my journey with Ruby, I came out with a pretty sick product; a web application that manages music and interfaces with the system to play tracks. Then as a finishing touch, added a desktop app.

What do I think of Ruby? Ruby is great. The syntax is clean and readable, gems are a great way of adding third party packages and save you time from writing having to write your own. The fact that everything is an object makes me happy. I will be spending more time learning Ruby.
