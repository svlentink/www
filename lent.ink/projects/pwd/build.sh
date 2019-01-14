#!/bin/sh

cp ./chrome-extension/* ./
mv pwdgen.htm index.html
sed -i 's/<!--insert-h1-here-->/<h1>Password generator<\/h1>/g' index.html
