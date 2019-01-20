#!/bin/sh
set -e

hugo version

mkdir -p ./output
rm -r ./output/* 2>/dev/null || true  #delete previous builds

for i in `ls ./`
do
  if [ -d "$i" ] && [ "$i" != "output" ]; then
    echo START $i
    cd $i
    hugo
    cd ..
    mv $i/public ./output/$i
    echo END $i
  fi
done

