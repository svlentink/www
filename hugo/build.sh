#!/bin/sh

# get themes blogs
mkdir -p www.nonni.video/themes
git clone https://github.com/svlentink/hugo-youtube-blog www.nonni.video/themes/youtube


# build all blogs
mkdir -p ./output
for i in `ls ./`
do
  if [[ -d "$i" ]]; then
    cd $i
    hugo
    cd ..
    mv $i/public output/$i
  fi
done
