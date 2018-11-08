#!/bin/sh

OUTP=index.html

which pandoc || apt install -y pandoc

cat head.htm > $OUTP
pandoc --from markdown --to html README.md >> $OUTP
echo '</section></body></html>' >> $OUTP
