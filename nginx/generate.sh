#!/bin/bash

# this code is based on the LetsEncrypt beta from dec 2015
function getCerts {
  local domains=$1 # comma seperated list/string
  local certLoc=/etc/letsencrypt/live
  local dhparamLoc=/etc/nginx/dhparam.pem
  cd
  if [ -d letsencrypt ]; then
    echo LetsEncrypt is allready installed
  else
    echo installing letsencrypt, giving it sudo rights
    git clone https://github.com/letsencrypt/letsencrypt
  fi
  sudo nginx -s stop
    letsencrypt/letsencrypt-auto
    echo 'running https://letsencrypt.readthedocs.org/en/latest/using.html#standalone'
    letsencrypt/letsencrypt-auto certonly --standalone --agree-tos --duplicate --domains "$domains" # --renew-by-default
  sudo service nginx restart
  if [ -f $dhparamLoc ]; then
    echo dhparam found
  else
    echo generating dhparam
    openssl dhparam -out $dhparamLoc 2048
  fi
  echo now please look in $certLoc/
}

getCerts $@
