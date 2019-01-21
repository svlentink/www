FROM node AS base

#RUN apk add --no-cache git python3
RUN apt update
RUN apt install -y python3 python3-pip zip
RUN git clone https://github.com/mazen160/GithubCloner.git
RUN pip3 install -r GithubCloner/requirements.txt
RUN GithubCloner/githubcloner.py --user svlentink -o /github-backup
RUN zip -r /all.zip /github-backup
RUN mv /all.zip /github-backup/
COPY . /github-backup/svlentink_www

WORKDIR /github-backup/svlentink_www/cdn.lent.ink/js
RUN ./build.sh

WORKDIR /github-backup/svlentink_www/lentink.consulting
RUN ./build.sh

WORKDIR /github-backup/svlentink_www/lent.ink/projects/pwd
RUN ./build.sh

WORKDIR /github-backup/svlentink_www/lent.ink/projects/life-planner
RUN npm install -g
RUN npm run build

FROM svlentink/yaml-resume AS resume
#COPY --from=base /github-backup/svlentink_resume /resume
#WORKDIR /resume
#RUN pip install -r requirements.txt

#RUN mkdir -p /output
#RUN mv /resume/content /content
ENV COMPILE_LANGUAGE english
RUN parsers/generate_all.py
ENV COMPILE_LANGUAGE dutch
RUN parsers/generate_all.py


FROM alpine AS hugo
RUN apk add --no-cache \
  --repository http://dl-cdn.alpinelinux.org/alpine/edge/community \
  hugo
RUN apk add --no-cache git tree

ARG HUGOPATH=/hugo
COPY --from=base /github-backup/svlentink_www/hugo $HUGOPATH
WORKDIR $HUGOPATH
RUN ./get-themes.sh
RUN ./build.sh

FROM nginx:alpine
COPY --from=base /github-backup /github-backup
RUN  rm -r /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www/nginx /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www /var/www;

COPY --from=resume /output /var/www/cdn.lent.ink/resume

COPY --from=hugo /hugo/output /output
RUN cp -r /output/* /var/www/; \
  rm -r /output
