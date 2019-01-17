---
title: "Data storage"
date: "2017-05-13"
draft: true
tags: ["old"]
---


This article will contain thoughts on the various
aspects when choosing what to backup and how.

## Variables

When looking at the various sorts of data,
we see four variables, by which they can be identified.

+ Freq. of change / update cadence / accessibility speed
+ Importance / (possible) value
+ Privacy indicator
+ Size / portability / quota

When assigning a value to them, I'll use `{0,1,2}`.
Lets look at them more closely.

### Accessibility

When it comes to passwords,
I would like to have them accessible all the time
(i.e. not on a note on my screen).
Another example could be my raw video footage of a trip I made 6y ago;
its okay to have it only accessible at home after searching my attic.

level | speed | examples
--- | --- | ---
0 | week | Backup of thesis, family pictures
1 | hour | Backup photo of Passport, dimensions home
2 | min | Passwords, contact details (e.g. phone numbers)

### Importance

Things that are less important are obvious;
software installers / movies (they're outdated soon).
While being able to login everywhere (2FA) is of high
importance.
Or the many cases people lost/deleted 100+ bitcoins.

lvl | impact | examples
--- | --- | ---
0 | low | Movies, applicance manuals
1 | medium | Personal photos, notes
2 | high | login credentials, calendar

### Privacy

Everything on my website is public,
which makes it easier to create free open backups.
Photos of 'progression losing weight' are private,
but not as private as my passwords.

TODO this value indicator should have a better name

lvl | censorship | examples
--- | --- | ---
0 | none | website contents, homework assignments
1 | select | wifi password, backup photo of password
2 | mine | login credentials, diary


### Size

A quick memo can be written down (just like passwords),
while movies take up a lot of space and can only be digital.

lvl | size | examples
--- | --- | ---
0 | low | notes, passwords
1 | medium | documents, MP3
2 | high | movies, OS installers



## Storage options

We'll now look at options to store our data.
The variable importance is not included,
since important data should be on multiple solutions
(e.g. lvl=1, option: Google Drive and Dropbox) or
even available offline (lvl 2).

option | speed | censorship | size | examples
--- | --- | --- | --- | ---
Public data dump | 2 | 0 | 1 | Github, blog
Free cloud backup | 2 | 1 | 2 | Dropbox, Stack, Google Drive
USB thumb drive | 1 | 2 | 1 | NA
Written down | 1 | 2 | 0 | NA
Burn CD/DVD | 0 | 2 | 2 | NA
Backup HDD | 0 | 2 | 2 | NA


## Data examples

Note that the impact of losing our banking credentials are medium,
we can walk by with our passport and ask,
while facebook does not has this feature and allows us to login almost anywhere.

Description | speed | censorship | impact | size | storage example
--- | --- | --- | --- | ---
Craigslist password | 1 | 1 | 0 | 0 | [passwords.google.com](http://passwords.google.com) (80% of passwords are less important)
Banking login | 1 | 2 | 1 | 0 | written notes
Facebook login | 2 | 2 | 2 | 0 | memorized, written down somewhere
Homework completed edu. | 0 | 1 | 0 | 2 | data DVD (one at home, backup at parents)
Family photos | 0 | 1 | 0 | 2 | NAS at home, Google Photos
Source code software projects | 1 | 0 | 1 | 1 | Github and NAS
Movies (pre-netflix) | 1 | 0 | 0 | 2 | NAS
Financial records | 1 | 1 | 1 | 1 | Google Drive and Dropbox
Documents | 2 | 1 | 1 | 1 | Google docs, montly backup to NAS






