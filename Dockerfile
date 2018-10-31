FROM node:alpine AS base
#FROM python:alpine AS base

RUN apk add --no-cache git python3
RUN git clone https://github.com/mazen160/GithubCloner.git
RUN pip3 install -r GithubCloner/requirements.txt
RUN GithubCloner/githubcloner.py --user svlentink -o /github-backup

RUN npm install -g webpack webpack-cli
WORKDIR /github-backup/svlentink_www/lent.ink/projects/life-planner
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=base /github-backup /github-backup
RUN  rm -r /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www/nginx /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www /var/www;

