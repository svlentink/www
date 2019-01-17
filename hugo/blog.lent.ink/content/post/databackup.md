---
title: "data backup strategy"
date: "2019-01-10"
draft: false
tags: ["security"]
---

We all have data we value,
but do we value our data?
Do we organize, version control and backup our data?


This overview is targeted at home users,
not enterprise or
[governments](https://www.us-cert.gov/sites/default/files/publications/data_backup_options.pdf),
which require multiple access groups and clearances.

## Approach

Before we start and make all our data redundant,
we need to have everything organized.
We want our data to be;

+ easy to file
+ easy to find
+ clear naming conventions; e.g. `20181120.md` not ~~20nov2018.md~~
+ clear directory structure; e.g. `./meetings/20181120.md` not ~~./meeting_20181120.md~~
+ independant of data carrier; e.g. hdd, dropbox, icloud, etc.

#### attributes
When thinking of the attributes we can give to our data,
we find 5 important indicators,
of which the first, revision,
is not independent of the platform.

We will first show the raw data
and then discuss it;
```yaml

parameters:
  revision:
    desc: is version control (VCS) a required
    value:
      0:
        desc: No
        examples:
          - pictures
      1:
        desc: Yes
        examples:
          - document format which allow it
  value:
    desc: impact when lost, importance
    values:
      0:
        desc: MAY be lost
        examples:
          - software binaries
          - music and movies
      1:
        desc: SHOULD NOT be lost
        examples:
          - birthday pictures
          - finished homework
      2:
        desc: MUST NOT be lost
        examples:
          - legal backup of financial records
          - private keys
      3:
        desc: MUST NOT be lost
        example:
          - private keys
          - store in (H)EMP proof data container
          - military grade, national secrets
  confidentiality:
    desc: how secret / public is the data
    values:
      0: 
        desc: public data
        examples:
          - html, css
          - food pics
      1:
        desc: non public but non secrative, may leak
        examples:
          - homework
          - selfies
      2:
        desc: non public, but accessible to storage provider
        examples:
          - email
          - financial records
      3:
        desc: secrets
        examples:
          - private keys
          - passwords
  availability:
    desc: accessibility / availability
    values:
      0:
        desc: cold storage / archive
        examples:
          - homework finished education
          - financial records years back
      1:
        desc: easy to obtain access
        examples:
          - disaster backup
      2:
        desc: easy to access
        examples:
          - documents
      3:
        desc: always access, offline syncing
        examples:
          - password manager
          - calendar
  size:
    desc: size on disk
    values:
      0:
        desc: KB
        examples:
          - passwords
      1:
        desc: MB
        examples:
          - database dump
      2:
        desc: GB
        examples:
          - photo gallery
      3:
        desc: TB
        examples:
          - logs
```

When we have clasified the 5 fields for our data set,
we first check for the post picky field,
down to the most generic:
- revision
- confidentiality
- size

The last two fields can be solved in various ways,
by providing backup(s) and different forms of availabilities:
- availability
- value

This gives us `2 * 4^4 =  512` possible file groups,
which is not what we want.
So we just group our files in directories
and specify the requirements for it.

#### Two omitted attributes:
To judge the availability,
one should also consider the update cadence, i.e.
the frequency of change.
We do not consider append only or write once storage,
since these are rare (e.g. central log server) or
old tech (cd/dvd).

We also do not consider collaboration.
This requirement is met with tools like Google Docs or Git.
Enterprise environments need to deal with this,
home users do not.





## Example providers

A subset of **free** storage providers:

| provider | storage type | R | C | S | A |
| --- | --- | --- | --- | --- | --- |
| github | public repo. | 1 | 0 | 1 | 3 |
| github | private repo. | 1 | 2 | 1 | 3 |
| bitbucket | public repo. | 1 | 0 | 1 | 3 |
| bitbucket | private repo. | 1 | 2 | 1 | 3 |
| dropbox | default | 0 | 2 | 2 | 2 |
| google | photos | 0 | 1 | 3 | 3 |
| google | drive | 0 | 2 | 2 | 3 |
| google | docs | 1 | 2 | 1 | 3 |
| stack | default | 0 | 2 | 2 | 3 |
| docker hub | other | 1 | 0 | 2 | 1 |
| usb hdd | local | 0 | 3 | 2 | 1 |
| NAS at home | local | 0 | 3 | 3 | 2 |

see
[here](https://www.moneysavingexpert.com/shopping/free-online-storage/)
or
[here](https://www.cloudwards.net/cloud-storage-for-linux/)
for more providers.

We all know people who write down lists of contacts details,
weight or [passwords](https://lent.ink/projects/pwd),
but each of them have a better digital alternative,
therefore we do not consider writing things down.
Printing your private keys as a backup may be the exception.

## Example files

| type | R | C | S | A | V | example solution |
| --- | --- | --- | --- | --- | --- | --- |
| finished education backup | 0 | 1 | 1 | 0 | 1 | 2 usb sticks, one at home, one at parents home |
| finished course current edu. | 0 | 1 | 1 | 2 | 2 | git repo. which is backed up to docker hub |
| current project / course | 1 | 2 | 1 | 3 | 3 | git repo. stored in Dropbox folder |
| long spanning documents; resume, lists | 1 | 2 | 1 | 2 | 2 | Google Docs and montly backup to usb hdd |
| (watched) movies | 0 | 0 | 3 | 1 | 0 | NAS which enables video streaming |
| private keys | 0 | 3 | 0 | 2 | 3 | local with full disk encryption and on usb in vault |
| wordpress | 1 | 0 | 1 | 2 | 2 | on server and daily backup to git repo. |
| wordpress db | 1 | 1 | 1 | 2 | 2 | dump.sql backed up using systemd timer to git |

#### Email
Email is usually very important,
but what if your free email service blocks your account?

We can prevent the damage by forwarding all email to another provider
(e.g. using gmail and hotmail as a backup).
Note that this gives you twice the chance of getting hacked.

#### Photos
The unlimited photo backup of Google is very handy,
but again, what if your account gets suspended?

To minimize the damage,
create an album of your valuable photos/videos
and download/backup this album once a month.

You could make albums by year;
'before2015', '2015', '2016', '2017', '2018'.
Which eases the backup procedure.

#### Stateful docker
If you keep state in your docker container,
you are doing it wrong, please mount volumes.
But if you are already there:
```
docker commit <container ID> <new image name> 
docker save  > image-name.tar
```

## Example setup

On my own machine (PC)
my files are stored on the hdd.

```
                                      ____________
                                     |sep. backup |
                                     |____________|
                                  __.
                                   /|
 _________________________________/
|pc hdd                          /|
|  _____________________________/ |
| |cloud sync                   | |
| |  _________________________  | |
| | |git repo. 01             | | |
| | |  _____________________  | | |
| | | |files                | | | |
| | | | ├── README.md       | | | |
| | | | ├── project_dir     | | | |
| | | | │   ├── file1.txt   | | | |
| | | | │   └── filen.txt   | | | |
| | | | ├── another_dir     | | | |
| | | | │   └── config.yaml | | | |
| | | | └── directory       | | | |
| | | |_____________________| | | |
| | |_________________________| | |
| |                             | |
| |  _________________________  | |
| | |git repo. 02             | | |
| | |  _____________________  | | |
| | | |files                | | | |
| | | |_____________________| | | |
| | |_________________________| | |
| |_____________________________| |
|_________________________________|



```
I have a cloud sync running (e.g. dropbox or drive)
and see this as my root directory for all my files,
so all my files are synced as a backup to the cloud.

Since I use a free cloud provider,
there is less incentive for them to keep my account up
and thus I have a separate backup.
This second backup is made once a week/month to another free service,
which gets an encrypted archive (.zip or .tgz) of my files.
This is my disaster recovery backup.

Active projects are more important and are also inside a git repository.
These git repositories have a backup on the git service in use.

To avoid keeping old git repositories on my machine,
we create a backup of them on
[docker hub](https://hub.docker.com/r/svlentink/mywebsite/dockerfile).


