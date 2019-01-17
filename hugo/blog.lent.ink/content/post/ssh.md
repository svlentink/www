---
title: "Forever 22"
date: "2015-11-18"
draft: false
tags: ["old"]
---


Let's talk about something that can benefit our lives.
No, not online clothes shopping, but SSH to your Linux VPS!

If the last sentence contained two things you needed to Google,
then this article isn't for you
(it all comes down to remote desktop, but fast).

As a programmer, I see myself as an artist.
Coding is a creative process for me,
which results in making creative notes all the time.
Sometimes, you just want to code that ideas,
in the park, on the train etc.

Some of us may know the struggle,
working from public transit, in the park or any place with bad internet.
We use our phone as modem and make sure not to download dependencies
on the go. Because doing `apt-get install -y texlive-full` will drain
your laptop or phone batt. before you get it.

In perspective; "What do I want?"
The answer is simple, I want to create and debug code,
for which I sometimes need large packages.

This all can be done on my VPS,
which I already run for my website
and is way to powerful for only serving my website,
which is visited about twice a day.

My current VPS, one from [scaleway.com](http://scaleway.com)
has 50GB SSD, 2GB ram and 4 cores (3eu/m).
Leaves me with enough power to do some real work.

## But why?

Look at it this way.
When working with your phone as a modem, you do not want large amounts of data.
SSH only is some text, you download all the data on the server, where it stays.
Your server download speed is, 9 out of 10 times, faster then the one you use.

Another thing to consider is device.
If I run everything on my local machine, I need a laptop,
while my phablet OnePlus smartphone with a USB
[OTG](https://www.kernel.org/doc/htmldocs/gadget/otg.html) keyboard attached
can be used to work using SSH (no to ideal, but you get the job done).

My personal reason to explore this path was my encounter with docker.
This provides us with a safe environment to play
(yes, also on my VPS where I host my non-important website).

Another thing I still want to create is the ability to use my ereader as a screen.
Warning, next is really geeky, please skip!

> Use my Android phone to run a
> [HTML SSH solution](https://en.wikipedia.org/wiki/Web-based_SSH),
> which takes the keyboard input from a USB OTG keyboard and
> shows the output not in an in-app browser, but servers them
> to the tethered device at port 80.
> Why this setup you ask? Not just the web based SSH on my VPS?
> Because my ereader (first sony) has an old linux kernel that
> does not support OTG, which I really need for the keyboard.

But for the more down to earth coder,
who sits in a dark room (just as I do, writing this post),
and does not need a e-ink screen, this is not an argument.
But saving money on hardware is.

Compare a macbook pro to a chromebook with 4GB ram and 1080p.
The difference is 1300eu to 220eu.
Which can be used to rent a powerful VPS for years.

## Conclusion

In the end, I know, this strange concept only applies to a very selective
audience. There are just to many criteria to be met
(working on the go/park, Linux fanboy, coder).

For me, the consistent internet speed, the freedom to work from many devices,
the extra level of geek, the money saving and a less heavy laptop,
make it my current challenge.

