---
title: "Scaleway C3"
date: "2015-12-16"
draft: false
tags: ["old"]
---

~~This is an old post, Scaleway does offer cheap 64bit VPSes now.~~

Scaleway has a good deal with their ARM VPS.
But there are some down sides..

One of them I have fixed (ufw).
The other, getting to run docker on them,
I have not tried to tackle.
I'm currently satisfied, but may switch to OVH in the future,
since their (same price) VPS has 64bit, which will run docker.

## Scaleway ufw lock out

I could not get the firewall up and running,
it kept locking me out, until I found
[this]{https://community.scaleway.com/t/how-to-configures-iptables-with-input-rules-with-dynamic-nbd/303/22}
solution;

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh # 22/tcp
sudo ufw allow www # 80/tcp
sudo ufw allow 443/tcp # https

echo going to change some config files, specific for scaleway #
echo creating backup of config files we change
sudo cp /etc/default/ufw /etc/default/ufw.bak
sudo cp /etc/ufw/after.rules /etc/ufw/after.rules.bak
echo changing them
sudo sed -i 's/IPV6=yes/IPV6=no/g' /etc/default/ufw
sudo sed -i 's/DEFAULT_INPUT_POLICY="DROP"/DEFAULT_INPUT_POLICY="ACCEPT"/g' /etc/default/ufw
sudo sed -i 's/COMMIT/-A\ ufw-reject-input\ -j\ DROP\nCOMMIT/g' /etc/ufw/after.rules

sudo ufw enable
sudo ufw status
```
