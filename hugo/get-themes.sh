#!/bin/sh
set -e

# get themes blogs
mkdir -p www.nonni.video/themes
git clone https://github.com/svlentink/hugo-youtube-blog www.nonni.video/themes/youtube

mkdir -p blog.lent.ink/themes
git clone https://github.com/ribice/kiss.git blog.lent.ink/themes/kiss

# mkdir -p lentink.consulting/themes
# https://themes.gohugo.io/hugo-lodi-theme/
# https://themes.gohugo.io/hugo-terrassa-theme/

# mkdir -p lent.ink/themes
# https://themes.gohugo.io/hugo-nederburg-theme/

