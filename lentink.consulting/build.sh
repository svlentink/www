#!/bin/sh

OUTP=index.html

which pandoc || apk --no-cache add pandoc

cat head.htm > $OUTP
pandoc --from markdown --to html README.md >> $OUTP
echo '</section></body></html>' >> $OUTP
