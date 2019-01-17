FROM alpine AS hugo
RUN apk add --no-cache \
  --repository http://dl-cdn.alpinelinux.org/alpine/edge/community \
  hugo
RUN apk add --no-cache git tree

ARG HUGOPATH=/hugo
COPY . $HUGOPATH
WORKDIR $HUGOPATH
#RUN ./get-themes.sh
VOLUME $HUGOPATH
ENTRYPOINT /hugo/build.sh
