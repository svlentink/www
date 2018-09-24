FROM python:alpine AS base

RUN apk add --no-cache git; \
  git clone https://github.com/mazen160/GithubCloner.git; \
  pip3 install -r GithubCloner/requirements.txt; \
  GithubCloner/githubcloner.py --user svlentink -o /github-backup;

FROM nginx:alpine
COPY --from=base /github-backup /github-backup
RUN  rm -r /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www/nginx /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www /var/www;

