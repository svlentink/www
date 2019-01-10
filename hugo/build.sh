#!/bin/sh

# get themes blogs
mkdir -p www.nonni.video/themes
git clone https://github.com/svlentink/hugo-youtube-blog www.nonni.video/themes/youtube


# build all blogs
mkdir -p ./output
for i in `ls ./`
do
  cd $i
  hugo
  cd ..
  mv $i/public output/$i
done
