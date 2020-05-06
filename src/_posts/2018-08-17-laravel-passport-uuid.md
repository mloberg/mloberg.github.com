---
layout: post
title: Using UUID Client IDs in Laravel Passport
categories: laravel
hero:
  name: i6VBVfcerso
  photographer: Peter Conlan
  link: https://unsplash.com/photos/i6VBVfcerso
---
__Update May 6th, 2020__: Laravel has released Passport 9.0, which supports
[UUIDs](https://laravel.com/docs/7.x/passport#client-uuids) out of the box!

---

By default, [Laravel Passport](https://laravel.com/docs/5.6/passport) uses auto
increment IDs for client IDs. There have been [numerous][issue-14]
[requests][issue-764] to [change][issue-576] this [field][issue-469] to be a
[UUID][issue-366], but it looks like that won't happen anytime soon.

[issue-14]: https://github.com/laravel/passport/issues/14
[issue-764]: https://github.com/laravel/passport/issues/764
[issue-576]: https://github.com/laravel/passport/issues/576
[issue-469]: https://github.com/laravel/passport/issues/469
[issue-366]: https://github.com/laravel/passport/issues/366

## Knives over Forks

There have been solutions such as forking Passport and changing to a UUID. I would
recommend not taking this approach because forks have a history of becoming
unmaintained.

Luckily, we can make this change without modifying any of Passport's code. Using
[model listeners](https://laravel-news.com/laravel-model-events-getting-started),
we can hook into the client's life cycle and make the changes we need.

## Migrations

First we need to modify the migrations that Passport provides to make the changes
at the database level. This is done by adding `Passport::ignoreMigrations()` to
`AppServiceProvider@register` and then publishing the migrations with
`php artisan vendor:publish --tag=passport-migrations`. Once we have the migrations
published, we need to edit any `client_id` field to be a uuid type.

{% highlight php %}
// in the create oauth clients migration
$table->uuid('id');
$table->primary('id');
// everywhere else referencing client_id
$table->uuid('client_id');
{% endhighlight %}

## Hey! Listen!

Now that we've made our changes to the database, we need to generate UUIDs when
a client is created. This can be done by using the `::creating` model event listener.
Let's add this to our `AppServiceProvider@boot` method.

{% highlight php %}
Client::creating(function (Client $client) {
    $client->incrementing = false;
    $client->id = \Ramsey\Uuid\Uuid::uuid4()->toString();
});
{% endhighlight %}

I'm using the [Ramsey UUID package](https://github.com/ramsey/uuid), but you
could use any other package or method for generating a UUID. You'll also notice
that incrementing is set to `false`. By default, Eloquent will cast id fields to
integers, so you may end up seeing this output if you don't add that line:

    Personal access client created successfully.
    Client ID: 0
    Client Secret: ZHywkvb0EPg0fYcxbdAlYLWhVSK0IHjoy5dW1j3B
    Password grant client created successfully.
    Client ID: 0
    Client Secret: NykgD7a94EBCnz0owASEaFz8tQKo6T7KBJGOX2YU

We've got our clients saving an auto-generated UUID, but what about when fetching
a client? The ID will still be cast to an integer. Using model event listeners
again, we can have it not cast to an integer. Add this to your
`AppServiceProvider@boot` method.

{% highlight php %}
Client::retrieved(function (Client $client) {
    $client->incrementing = false;
});
{% endhighlight %}

## That was easy

With just a few lines of code, none of which overwrites base Passport code,
we've got UUID client IDs instead of auto-incrementing IDs.
