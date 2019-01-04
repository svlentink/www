#!/bin/sh

cp ./chrome-extension/* ./
mv pwdgen.htm index.html
sed -i 's/<body>/<body><h1>Password generator<\/h1>/g' index.html
