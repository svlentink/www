FROM nginx:alpine

RUN apk add --no-cache git python3; \
  git clone https://github.com/mazen160/GithubCloner.git; \
  pip3 install -r GithubCloner/requirements.txt; \
  GithubCloner/githubcloner.py --user svlentink -o /github-backup; \
  rm -r /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www/nginx /etc/nginx/conf.d; \
  mv /github-backup/svlentink_www /var/www;
