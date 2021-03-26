FROM svlentink/mywebsitebase AS base

RUN GithubCloner/githubcloner.py --user svlentink -o /github-backup
RUN GithubCloner/githubcloner.py --user tunroam -o /github-backup
RUN ls -l /github-backup/ # show cloned repo.s
COPY . /github-backup/svlentink_www
RUN rm -r /github-backup/*/.git
RUN zip -r /github-backup.zip /github-backup > /dev/null

WORKDIR /github-backup/svlentink_www/cdn.lent.ink/js
RUN ./build.sh

RUN mkdir -p /data
RUN mv /github-backup/svlentink_www /data/webroot

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

ARG WEBPATH=lentink.consulting/resume
ARG OUTPATH=/data/webroot/$WEBPATH
RUN mkdir -p `dirname $OUTPATH`
RUN mv /output $OUTPATH

FROM svlentink/pwdgen-data AS pwdgen
FROM svlentink/myhugoblogs-data AS hugo
FROM svlentink/lplan-data AS lifeplanner
FROM svlentink/formcreator-data AS form

FROM busybox AS bundle
COPY --from=base /github-backup.zip /webroot/github-backup.zip
COPY --from=base /data/webroot /webroot
COPY --from=pwdgen /data/webroot /webroot
COPY --from=resume /data/webroot /webroot
COPY --from=hugo /data/webroot /webroot
COPY --from=lifeplanner /data/webroot /webroot
COPY --from=form /data/webroot /webroot

FROM conoria/alpine-pandoc as markdown
COPY --from=bundle /webroot /webroot
RUN echo "<style> body { max-width:700px; margin:auto; } </style>" > /tmp/style.css
RUN for f in `find /webroot -name index.md`;do \
      OUT="`echo $f|sed 's/md\$/html/'`" \
      && \
      if [ ! -f "$OUT" ]; then \
        echo "Generating $OUT"; \
        cat /tmp/style.css "$f" > "$f" \
        pandoc --from gfm --to html --standalone --title-prefix="`grep '^#\s' \"$f\"|head -1|cut -c 3-`" -o "$OUT" "$f"; \
      fi; \
    done

FROM nginx:alpine
RUN  rm -r /etc/nginx/conf.d
COPY ./nginx /etc/nginx/conf.d
COPY --from=markdown /webroot /var/www

