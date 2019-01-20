#!/bin/sh
set -e

# get themes blogs
( mkdir www.nonni.video/themes \
  && git clone https://github.com/svlentink/hugo-youtube-blog www.nonni.video/themes/youtube ) \
  || echo theme already downloaded

( mkdir blog.lent.ink/themes \
  && git clone https://github.com/ribice/kiss.git blog.lent.ink/themes/kiss ) \
  || echo theme already downloaded

# Initially I had this the yourfolio theme,
# but it required everything in yaml format
# and links were not showing etc.
# https://themes.gohugo.io/yourfolio/
( mkdir lentink.consulting/themes \
  && git clone https://github.com/danielkvist/hugo-terrassa-theme.git lentink.consulting/themes/terrassa ) \
  || echo theme already downloaded
# https://themes.gohugo.io/hugo-lodi-theme/
# https://themes.gohugo.io/hugo-terrassa-theme/
# https://themes.gohugo.io/hugo-serif-theme/

# mkdir -p lent.ink/themes
# https://themes.gohugo.io/hugo-nederburg-theme/
# https://themes.gohugo.io/landing-page-hugo/

# mkdir -p uptime.lent.ink/themes
# https://themes.gohugo.io/theme/cstate/


