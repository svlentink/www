---
title: "Lightweight open source ERP"
date: "2019-01-28"
draft: false
---


When developing software, teams often use an Agile process.
Usually using a product backlog, providing a clear overview of the desired features.

For my personal projects (which usually involve code) and other tasks in life,
I did not keep to such a structure and was looking for an unified overview.
The various notes; written, Google keep, in the README of the project etc.
are not efficient enough.

What I need is a good project management tool,
to enhance productivity and create an overview.
In my case this needs to be an open source solution,
since I want to be the owner of my data.
While search for it,
I found that ERP systems usually also provide project management,
which made me look into them.
An ERP could provide me with more,
one single system (or running multiple instances)
which include personal and business finances.
Another benefit is getting familiar with an ERP (useful for my line of work)
and providing a structure that your heirs could understand.

## open source ERP

When looking for an open source ERP,
I found
[some](https://opensource.com/tools/enterprise-resource-planning)
comparisons
and their
[popularity](https://github.com/topics/erp).
The first and foremost was being lightweight.

The Java based lost my interest from the start,
probably all too heavy,
which brought me to the two most popular;
[Odoo](https://www.odoo.com/groups/community-59/community-32937746)
vs.
[ERPNext](https://erpnext.org/blog/opensource/an-open-letter-to-the-odoo-community).


They both required
[2GB RAM](https://jwrober.github.io/erpnext_admin_guide/i-u-b/install)
which was way too heavy for my use.

## Lightweight open source ERP

The next mostly popular project on Github was Dolibarr,
which also scored high on
[Sourceforge](https://sourceforge.net/directory/business-enterprise/enterprise/erp/).

I've managed to get it up and running with basic auth
([code](https://github.com/svlentink/dockerfiles/blob/master/docker-compose/dolibarr/docker-compose.yml)).

## Dolibarr

Just did the initial configuration to play with Dolibarr,
but not yet installed the Kanview plugin.
Not sure yet how I want to organize my project progress data.
Maybe keep it in the project (the backlog items)
and only references on my backlog with links to the items (in Markdown).

An ERP can do a lot,
from calendar to bookmarks to financial planning.
All useful features for my personal and business life.
But I'll first install Nextcloud
and configure my own mail server (Exim).
First start using the tools I know I want to use.
