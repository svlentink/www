This contains most of the content found on my server,
which is accessible through http(s) via your favorite browser (e.g. w3m ;).

The obvious has been excluded; pictures, archives etc.

My recent js is formated using this [standard](https://www.npmjs.com/package/standard).

You may ask, why put this on github?
Well, why not, it is already for everyone to download from my website.
Github gives us syntax highlighting for a better read.


The nginx config is also included, since most can already be guessed
from my certificates and the nginx version number.


## TODO

Currently,
this is a way too big pool of projects.

### New design

This project is an Nginx container which pulls generated/compiled websites
and content and serves it.

#### How it works

Example projectA Dockerfile:
```Dockerfile
FROM node AS build
COPY . /data
WORKDIR /data
RUN npm build
ARG WEBPATH=lent.ink/projects/pwd
ARG OUTPATH=/data/webroot/$WEBPATH
RUN mkdir -p `dirname $OUTPATH`

# Now we move the static website
# to the path we would visit in the browser
# this container thus specifies the path
RUN mv public $OUTPATH

FROM scratch
COPY --from=build /data /data
```

Example Dockerfile of static server:
```Dockerfile
FROM projectA as projectA
FROM projectB as projectB

FROM busybox as bundle
COPY --from=projectA /data/webroot /webroot
COPY --from=projectB /data/webroot /webroot

FROM nginx:alpine
COPY --from=bundle /webroot /var/www
COPY ./nginx /etc/nginx/conf.d

```
This thus bundles the multiple static generated projects
into one which is able to serve all content.

### to test
```
#does not move hidden:
mv dir/* dest/
#does move hidden:
mv dir/.* dest/

Dockerfile COPY ???
```

