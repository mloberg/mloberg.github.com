---
layout: post
title: Securing Your Passwords
category: security
---
Today TutsPlus Premium got hacked. They used a third party plugin that stored passwords in plaintext. This is ironic, because NetTuts+, a sibling company posts about [security](http://net.tutsplus.com/tutorials/php/understanding-hash-functions-and-keeping-passwords-safe/) once in a while. It's also very frustrating for users (both present and past) because they have to change their password not only on Tuts+, but other sites as well.

If you're storing passwords in plaintext, please stop for the sake of your users and your company/product. I'm going to show you that it's easy to implement securing your user's password.

#### An Introduction To bcrypt

I personally use [bcrypt](http://en.wikipedia.org/wiki/Bcrypt) to hash all my passwords. It's a hash that incorporates a salt (to protect against rainbow attacks) and is adaptive, meaning it can be made slower over time (as computers speed up) to protect against brute-force attacks. This is by far the most recommended hashing function out there because of these features. I'll show you how to implement it in both PHP and Ruby.

#### PHP

If you are using PHP 5.2 or earlier, you may not have bcrypt available to you. In these versions it was implemented on the system side rather then in PHP itself (as in 5.3 and later). You can check if it is available on your system.

{% highlight php %}
<?php

if (CRYPT_BLOWFISH == 1) {
    echo "Yes";
} else {
    echo "No";
}
{% endhighlight %}

To implement, we'll use PHP's [crypt](http://us.php.net/manual/en/function.crypt.php) function. This supports different varieties of hash types, and what one will be used is based on the salt.

Bcrypt's salt starts with '$2a$' followed by a two digit cost, another '$' and 22 characters from './0-9A-Za-z'. The cost parameter relates to how much load it will take to crypt the password. You'll have to find a number (04 to 31) that isn't too slow or too fast on your system. Here are two different ways to generate a bcrypt salt.

{% highlight php %}
<?php

function generate_salt($cost = 12) {
    return '$2a$' . str_pad($cost, 2, '0', STR_PAD_LEFT) . '$' . substr(sha1(mt_rand()),0,22);
}

function secure_generate_salt($cost = 12) {
    $salt = '$2a$' . str_pad($cost, 2, '0', STR_PAD_LEFT) . '$';
    $salt .= substr(str_replace('+', '.', base64_encode(openssl_random_pseudo_bytes(16))), 0, 22);
    return $salt
}
{% endhighlight %}

The `secure_generate_salt` is a little more secure as it used openssl to generate a random string, but you will need the openssl extension enabled.

Once you have a salt, hashing your password is simple.

{% highlight php %}
<?php

$salt = secure_generate_salt();
$hash = crypt('password', $salt);
{% endhighlight %}

Now you're storing secure passwords, congratulations. But how do we verify if the user's input matches our stored hash?

{% highlight php %}
<?php

function verify_hash($input, $hash) {
    return crypt($password, $hash) === $hash;
}
{% endhighlight %}

As simple as that. If you put that together in a class, you can have a really handy tool.

{% highlight php %}
<?php

class Crypter {

    private static $cost = 12;

    public static function generate_salt($cost = null) {
        if (is_null($cost)) $cost = self::$cost;
        if ($cost < 4 || $cost > 31) throw new Exception('Cost must be between 4 and 31');
        $salt = '$2a$' . str_pad($cost, 2, '0', STR_PAD_LEFT) . '$';
        $salt .= substr(str_replace('+', '.', base64_encode(openssl_random_pseudo_bytes(16))), 0, 22);
        return $salt
    }

    public static function hash($input, $cost = null) {
        return crypt($input, self::generate_salt($cost));
    }

    public static function verify($input, $hash) {
        return crypt($input, $hash) === $hash;
    }

}
{% endhighlight %}

#### Ruby

Why yes there is a [bcrypt gem](http://bcrypt-ruby.rubyforge.org/), which makes it super simple to implement in your application. Install it with `gem install bcrypt-ruby` and require `bcrypt`.

Generate a hash with `BCrypt::Password.create`.

{% highlight ruby %}
require 'bcrypt'

password = BCrypt::Password.create("password")
# cost defaults to 10, you can manually set the cost
password = BCrypt::Password.create("password", :cost => 12)
{% endhighlight %}

And verify a password with `BCrypt::Password.new`

{% highlight ruby %}
require 'bcrypt'

password = BCrypt::Password.new(hash)
password == input # true if password
{% endhighlight %}

#### Forgot Passwords

Since you're not storing passwords in plaintext anymore, you won't be able to send passwords in emails if someone forgot theirs. Instead you'll have to build a password reset system. You could either have a temporary link or generate a random password and send it to them or another method.

#### Updating Costs

If you find that the costs you've been using are either too fast or too slow you can't just change the cost parameter in the hash. You can instead rehash the password on a successful login using your new cost.

#### So Why Aren't You Using bcrypt?

As you can see, bcrypt is both secure and easy to use. You have no good reason to continue storing passwords in plaintext.
