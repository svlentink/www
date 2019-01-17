#!/bin/sh
set -e

hugo version

# build all blogs
mkdir -p /output
for i in `ls ./`
do
  if [[ -d "$i" ]]; then
    cd $i
    hugo
    cd ..
    mv $i/public /output/$i
  fi
done
mv /output ./

