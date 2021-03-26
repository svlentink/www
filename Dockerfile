FROM svlentink/mywebsite:data AS base
FROM svlentink/yaml-resume:myresume AS resume
FROM svlentink/pwdgen-data AS pwdgen
FROM svlentink/myhugoblogs-data AS hugo
FROM svlentink/lplan-data AS lifeplanner
FROM svlentink/formcreator-data AS form

FROM busybox AS bundle
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
        TITLE=`grep '^#\s' "$f"|head -1|cut -c 3-`; \
        echo "Generating $OUT $TITLE"; \
        cat /tmp/style.css "$f" > /tmp/file-with-style.md && \
        pandoc --from gfm --to html --standalone --metadata title="$TITLE" -o "$OUT" /tmp/file-with-style.md; \
      fi; \
    done

FROM nginx:alpine
RUN  rm -r /etc/nginx/conf.d
COPY ./nginx /etc/nginx/conf.d
COPY --from=markdown /webroot /var/www

