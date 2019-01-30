FROM node AS base

#RUN apk add --no-cache git python3
RUN apt update
RUN apt install -y python3 python3-pip zip
RUN git clone https://github.com/mazen160/GithubCloner.git
RUN pip3 install -r GithubCloner/requirements.txt
RUN GithubCloner/githubcloner.py --user svlentink -o /github-backup
RUN zip -r /github-backup.zip /github-backup > /dev/null
COPY . /github-backup/svlentink_www

WORKDIR /github-backup/svlentink_www/cdn.lent.ink/js
RUN ./build.sh

WORKDIR /github-backup/svlentink_www/lentink.consulting
RUN ./build.sh

WORKDIR /github-backup/svlentink_www/lent.ink/projects/life-planner
RUN npm install -g
RUN npm run build

RUN mkdir -p /data
RUN mv /github-backup/svlentink_www /data/webroot

FROM alpine AS hugo
RUN apk add --no-cache \
  --repository http://dl-cdn.alpinelinux.org/alpine/edge/community \
  hugo
RUN apk add --no-cache git tree

ARG HUGOPATH=/hugo
COPY --from=base /data/webroot/hugo $HUGOPATH
WORKDIR $HUGOPATH
RUN ./get-themes.sh
RUN ./build.sh
RUN mkdir -p /data/webroot
RUN cp -r $HUGOPATH/output/* /data/webroot/

FROM svlentink/yaml-resume AS resume
#FROM python AS resume
#COPY --from=base /github-backup/svlentink_resume /resume
#WORKDIR /resume
#RUN pip install -r requirements.txt
RUN mkdir -p /output
#RUN mv /resume/content /content
ENV COMPILE_LANGUAGE english
RUN parsers/generate_all.py
ENV COMPILE_LANGUAGE dutch
RUN parsers/generate_all.py
RUN ls /output

ARG WEBPATH=cdn.lent.ink/resume
ARG OUTPATH=/data/webroot/$WEBPATH
RUN mkdir -p `dirname $OUTPATH`
RUN mv /output $OUTPATH

FROM svlentink/pwdgen-data AS pwdgen

FROM busybox AS bundle
COPY --from=base /github-backup.zip /webroot/github-backup.zip
COPY --from=base /data/webroot /webroot
COPY --from=pwdgen /data/webroot /webroot
COPY --from=resume /data/webroot /webroot
COPY --from=hugo /data/webroot /webroot


FROM nginx:alpine
RUN  rm -r /etc/nginx/conf.d
COPY ./nginx /etc/nginx/conf.d
COPY --from=bundle /webroot /var/www
