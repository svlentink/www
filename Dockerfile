FROM node AS base

#RUN apk add --no-cache git python3
RUN apt update
RUN apt install -y python3 python3-pip
RUN git clone https://github.com/mazen160/GithubCloner.git
RUN pip3 install -r GithubCloner/requirements.txt
RUN GithubCloner/githubcloner.py --user svlentink -o /github-backup
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

FROM nginx:alpine
COPY --from=base /github-backup /github-backup
RUN  rm -r /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www/nginx /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www /var/www;

