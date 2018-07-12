---
layout: post
title: Composer Version Alias Hack
category: php
excerpt: Quickly solve version dependency differences in composer.
redirect_from: /blog/2017/12/23/composer-version-alias-hack.html
---
With the release of Symfony 4 last month, we've slowly been seeing package
maintainers update their packages to support the latest version of Symfony
components. If you are a package maintainer and haven't done so, you should
check out [my guide for supporting multiple versions of Symfony]({% post_url 2015-12-23-mulitple-versions-of-symfony-components %}).

What happens if a package you use doesn't support Symfony 4? You can always
fork the repo, add the version constraints and open up a pull request. Often,
maintainers are happy to accept your pull request and create a new tag for it
in a couple days.

What about a package that isn't active and could take months for them to update?
You could fork it and use your fork in your project, but I'm not a fan of doing
this. You could end up with a lot of forks that become stale.

With flex not requiring all of Symfony, you might be able to get away with
having a few packages being 3.4. The only difference between 4.0 and 3.4 is
removed deprecations.

What if it's a common package like YAML or Console? What if it's another common
package that has a lot of different version requirements like
[php-parser][php-parser]? I ran into this last week and it didn't look like the
packages I was wanting to use were going to get updated anytime soon.

Enter the Composer Version Alias hack. This hack allows you to require a version
of a package as if it were another. Example:

{% highlight json %}
{
    "require": {
        "symfony/yaml": "4.0.2 as 3.4.0"
    }
}
{% endhighlight %}

This is saying that our version 4.0.2 will be imported as 3.4.0. Now any package
that requires Symfony YAML version 3, will work because we are aliasing our
installed version to 3.4.0.

This hack isn't ideal. It may not work 100% of the time and can cause upgrading
to be annoying (because it requires the full version). If you find yourself
needing a package really quick, it can be a lifesaver.

[php-parser]: https://github.com/nikic/PHP-Parser
