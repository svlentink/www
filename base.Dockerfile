FROM node AS base

#RUN apk add --no-cache git python3
RUN apt update
RUN apt install -y python3 python3-pip zip
RUN git clone https://github.com/mazen160/GithubCloner.git
RUN pip3 install -r GithubCloner/requirements.txt
