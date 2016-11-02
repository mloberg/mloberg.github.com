---
layout: post
title: "Quick Tip: Protect Important EC2 Instances"
description: Accidentally deleted your production database instance on EC2? Prevent that from happening again.
---
I did something really stupid today. I was doing a load test with [Bees With Machine Guns!](https://github.com/newsapps/beeswithmachineguns) that I thought was only going to hit Apache, and not the database. Turns out there is a small database call on the page I was hitting, and caused the database to spike. I tried exiting out of Bees, but it wouldn't. The site started to crash, so I went to terminate the bee instances in the AWS console, but didn't realize I had the production database selected. After hitting terminate, all hell broke loose.

Luckily we had a slave database running, that we were able to switch to relativly quickly. The EBS disks were still around, so we were able to get our production database back up and running. But what if we didn't have the slave (if you don't, you really should), or the EBS disks were terminated with the instance? We would have been SOL.

Luckily there is a termination protection feature in EC2 that you can use. Just enable termination protection, and you can't terminate your instance. I did that with the slave database, the replacement database, and a few other "mission critical" instances. Now some dumbass like me can't accidentally delete all your data.

Turning this on, of course, does not mean you shouldn't be backing up your data. There's no reason you shouldn't be doing that.
