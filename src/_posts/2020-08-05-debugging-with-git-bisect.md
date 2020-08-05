---
layout: post
title: Debugging With Git Bisect
categories: git
hero:
  name: gE08jRp3Qw4
  photographer: Aaron Lee
  link: https://unsplash.com/photos/gE08jRp3Qw4
date: 2020-08-05 09:59 -0500
---
I've been fixing a lot of regressions in the project I've been working on. I'm
new to the codebase, so it often takes me a little bit to figure out where the
issue is. One tool that I've been relying a lot on to help me is `git bisect`. I
hadn't used [git-bisect](https://git-scm.com/docs/git-bisect) much before this
point, so I kept finding myself having to look up how to use it every time. By
writing this post, I hope to cement the usage of and hopefully have to look up
how to use it less.

If you haven't used (or even heard of) `git bisect`, it allows you to find a commit
that introduced a bug. You do this by giving it a non-working commit and a working
commit. It will then checkout different commits to determine where the bug was
introduced. This process can either be manual, where you tell it if the commit
is working or not, or automatic by giving it a script to run.

## Practice Makes ~~Perfect~~ Better

To help us learn `git bisect`, we'll use an [exercise repo](https://github.com/bast/git-bisect-exercise).
This one uses Python, but there are [others](https://github.com/bradleyboy/bisectercise)
if you want a different language.

To start a bisect you'll first need to know both a working and non-working commit.
We'll use _HEAD_ as our bad commit. To find a good commit, use `git log --oneline`
to list out your commits. If you want to filter that down between dates, use
`git log --after="2018-06-30" --before="2018-07-03" --oneline`. Find one that you
think works with `git checkout 4d83cf` and verify it works. Once verified, checkout
back to where you were with `git checkout -`.

Now that we have our commits identified, we can start the bisect.

    git bisect start HEAD f0ea950

This will checkout to a commit, which we then need to tell git-bisect if it's
working or not. In the exercise repo, we run `python get_pi.py`.

    Bisecting: 250 revisions left to test after this (roughly 8 steps)
    [5c6fb09b319ae1f2e09933afce65e825d8c72c77] commit number 251

    ➜ python3 get_pi.py
    3.57

In this case, the output isn't correct, so we'll tell git-bisect that this commit
isn't working or "bad" with `git bisect bad`. We then repeat this process.

    ➜ git bisect bad
    Bisecting: 124 revisions left to test after this (roughly 7 steps)
    [c65f54597261771201b900cfa0ccd9da520eb93f] commit number 126

    ➜ python3 get_pi.py
    3.14

Here our output is correct, so we'll tell git-bisect that this commit is working
or "good" with `git bisect good`. Repeat this process until it determines which
commit introduced the bug.

    326f68a558501a6f44d7685c2c1795794bac09b5 is the first bad commit
    commit 326f68a558501a6f44d7685c2c1795794bac09b5
    Author: Radovan Bast <bast@users.noreply.github.com>
    Date:   Fri Mar 29 16:02:52 2019 +0100

        commit number 137

    get_pi.py | 8 ++++----
    1 file changed, 4 insertions(+), 4 deletions(-)

git-bisect will checkout this commit for us where we can start to debug and fix
the regression. Once we're done with our bisect, we can run `git bisect reset`.

## Automate It

Using `git bisect` manually can take some time and is also prone to user error
(entering `git bisect good` instead of `git bisect bad`). git-bisect also has an
automatic mode where we can pass a script that it will check against. This isn't
always an option depending on the bug or codebase.

Using our exercise repo as an example, let's use the example from the README.

```python
# test.py
import subprocess
import math
import sys

output = subprocess.check_output(['python', 'get_pi.py'])
result = float(output)

if math.isclose(result, 3.14):
    sys.exit(0)
else:
    sys.exit(1)
```

Start the bisect the same as before `git bisect start HEAD f0ea950`. Instead of
running the script and telling bisect if it's working or not, we tell it to run
our test script.

    git bisect run python3 test.py

If we did everything right, we should get the same result as before.

## tl;dr;

git-bisect is a convenient way to find a commit that introduced a bug. Once we have
a working commit identified, start the process with

    git bisect start HEAD [working]

Now we can either run our test manually and tell git-bisect if it's working or not

    git bisect good # code is working
    git bisect bad # code is not working

Or if we can have it run automatically with `git bisect run [script]`.

    git bisect run phpunit tests # run our unit tests

It will then identify the commit the bug was first introduced in. Finish the
bisect with

    git bisect reset
