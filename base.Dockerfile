FROM node AS base

#RUN apk add --no-cache git python3
RUN apt update; \
  apt install -y python3 python3-pip zip; \
  git clone https://github.com/mazen160/GithubCloner.git; \
  pip3 install -r GithubCloner/requirements.txt
