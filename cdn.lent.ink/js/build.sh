#!/bin/bash

# this currently does not include versioning
# since I never needed it, maybe later
file01=SVL.min.js
file02=SVL_util.min.js
file03=SVL_all.min.js #includes hack

if [ -z "$(which uglifyjs)" ]; then
  sudo npm install -g uglify-js
fi

echo creating $file01
uglifyjs --compress --comments --output $file01 basics/*.js

echo creating $file02
uglifyjs --compress --comments --output tmp.util.js util/*.js
cat $file01 > $file02
cat tmp.util.js >> $file02
rm tmp.util.js

echo creating $file03
uglifyjs --compress --comments --output $file03 ./**/*.js
