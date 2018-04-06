FROM nginx:alpine

RUN apk add --no-cache git python3
RUN git clone https://github.com/mazen160/GithubCloner.git
RUN pip3 install -r GithubCloner/requirements.txt

RUN GithubCloner/githubcloner.py --user svlentink -o /github-backup

#RUN ln -s /github-backup/svlentink_www/nginx /etc/nginx/conf.d
#RUN ln -s /github-backup/svlentink_www /var/www
#RUN chmod +rX -R /var/www
#RUN echo 'disable_symlinks off;' > /etc/nginx/conf.d/enable_symlinks.conf
RUN mv /github-backup/svlentink_www /var/www
RUN echo 'include /var/www/nginx/*.conf;' > /etc/nginx/conf.d/default.conf

