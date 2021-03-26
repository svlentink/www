FROM node AS base

#RUN apk add --no-cache git python3
RUN apt update && \
    apt install -y python3 python3-pip tar && \
    git clone https://github.com/mazen160/GithubCloner.git && \
    pip3 install -r GithubCloner/requirements.txt

RUN GithubCloner/githubcloner.py --user svlentink -o /github-backup && \
    GithubCloner/githubcloner.py --user tunroam -o /github-backup && \
    ls -l /github-backup/ # show cloned repo.s
COPY . /github-backup/svlentink_www
RUN rm -r /github-backup/*/.git && \
    tar czf /github-backup.tgz /github-backup && \
    mv /github-backup.tgz /github-backup/

WORKDIR /github-backup/svlentink_www/cdn.lent.ink/js
RUN ./build.sh && \
    mkdir -p /data && \
    mv /github-backup/svlentink_www /data/webroot && \
    mv /github-backup/github-backup.tgz /data/webroot/

FROM scratch
COPY --from=base /data /data
