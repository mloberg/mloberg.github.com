---
layout: post
title: Using Git Commit Messages As Your Changelog
category: devops
redirect_from: /blog/2011/12/09/using-git-commit-messages-as-your-changelog.html
---
I love git. It's a powerful tool that I keep discovering new commands for. Pair git with GitHub and you've got a near perfect way to manage code.

Up until recently, when I did a commit I would always use the -m argument and just send a short, vague commit message. Then after reading up on some git "best practice" stuff, I decided to start omit the -m tag and start writing "proper" git commit messages. Since I've done this, unless the commit can be explained in one line, I've been using a full commit message. The first line explains the general overview of the commit. Then there are paragraphs to explain the major changes. Then I usually add a list of other smaller changes.

Since doing this, I haven't found a use for keeping a changelog. My git commit messages are my change log now. If I need to see my changelog.

{% highlight bash %}
git log
{% endhighlight %}

Or if I want the full details with what files changed.

{% highlight bash %}
git log --stat --summary
{% endhighlight %}

If you're using git (if you're not, why not?), you should start writing more then just a single line for a commit message. It helps you keep track of exactly what changed along with anyone else who is involved with the project.
