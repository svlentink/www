# cheatsheet DIY home automation

First let set the scene.
+ Love cheap solutions for home automation
+ Love being able to write custom code
+ Hate it when stuff is dependant on the vendors' server (most smart products)
+ Don't like the physical aspect, get me the CLI over SSH ASAP

In the past I worked with primitive setups like Arduino
or tried to get an ESP8266 wifi relay working.
In my opinion,
too limited and only worth considering if you need analog or economies of scale.
Therefor, all my DIY home automation have a Linux kernel.

## Step00: hardware

Get the required hardware.

+ USB to TTL
+ Board
+ dupont cables
+ power supply
+ relay
+ SD card
+ Laptop with Linux, Windows or Mac
+ etc.

## Step01: bootable

To get the board up and running,
we need the **server** version of the OS booting from the SD card.

Download it and `dd` or [xz](http://www.armhf.com/getting-started-with-ubuntu-img-file/)
it to the SD card.
(google 'create bootable sd card YOUR-BOARD-NAME')

Get a local CLI, via HDMI, usb serial console (build in or a separate USB to TTL).
Confirm that it is booting.
```
GND --- GND
 RX -v- RX
 TX -^- TX
```
I made this picture very unclear to highlight that RX connects to TX.

```
screen $(ls -tr /dev/tty*|grep -i usb|tail -1) 115200
```

## step02 SSH

We will now configure the wifi.
The name of the interface can be found using `ip link`,
mine is called `wlan0`.
On the sd card, add the following to `/etc/network/interfaces`:
```
allow-hotplug wlan0
auto wlan0
iface wlan0 inet dhcp
  wpa-ssid "my wifi network name"
  wpa-psk MyPlainTextPassWord

```

## step03 install 

Install the basics

```
apt update
apt dist-upgrade -y
apt install -y python-dev git python3-pip vim tree
```

## step04 GPIO

We now find the right GPIO library for our board,
for the OrangePI Zero we do:
```
# https://opi-gpio.readthedocs.io/en/latest/api-documentation.html
pip3 install OPi.GPIO
```
We search on google for 'BOARD-NAME BOARD-VERSION pinout',
from which we learn the pin numbers to use.

The following code is based on the example code that came with OPi.GPIO:
```python
root@OrangePI:~# cat /usr/local/bin/set-relay.py 
#!/usr/bin/env python3

import OPi.GPIO as GPIO
import sys

pin = 24 #which is PA13 on pinout

GPIO.setmode(GPIO.BOARD)
GPIO.setup(pin, GPIO.OUT)

val = sys.argv[-1:][0]
if val == '1':
  GPIO.output(pin,False)
else:
  GPIO.output(pin,True)

print(val)
 
```

Don't forget to:
```shell
chmod +x /usr/local/bin/set-relay.py
```

We can now test this script with:
```shell
set-relay.py 1 # turn on
set-relay.py 0 # turn off
```

Hardware:
- connect the jumper on the relay board between 'VCC' and 'JD VCC'
- connect the 'VCC' near the 'in1' to 5V on the controller board
- connect GND to GND
- connect 'in1' to the GPIO using a [resistor](https://tutorials-raspberrypi.com/raspberry-pi-control-relay-switch-via-gpio/)


## step05 create

Create whatever you like.

### Example: Smart heater controlled via Dropbox

This example controls a heater.
The heater unit is located on the attic,
while the thermostat is located in the living room.

We keep the thermostat in place,
enabling us to control the temperature there,
but we make a cut in the line to insert the wifi relay.
This enables us to turn the heater on or off,
which will heat until the desired temperature set on the thermostat.

This makes the heater smart;
we can control it from the web or set a timer,
but not control the temperature.

We create the timer script,
which will turns it on during specific times.
Outside these time frames,
we check a shared (with housemates) dropbox file,
which contains either a '1' or '0'.

```
#!/bin/sh

# The following can be a link to a shared dropbox file or a file on your server
FILELOC="https://www.dropbox.com/s/dl/SECRET-TOKEN/filename.txt?dl=1"
TIME=`date +%H%M`

# during the following time blocks
# we always want the heater on
if [ $TIME -gt 0430 ] && [ $TIME -lt 0615 ]
then
  # morning
  echo 1
  exit
fi

if [ $TIME -gt 1530 ] && [ $TIME -lt 2045 ]
then
  # evening
  echo 1
  exit
fi

curl --silent -L $FILELOC \
  | grep 1 \
  || echo 0
exit

```
pay attention to **dl=1**.

This script is saved and tested:
```
root@OrangePI:~# vi /usr/local/bin/get-heater-val.sh
root@OrangePI:~# chmod +x /usr/local/bin/get-heater-val.sh
root@OrangePI:~# get-heater-val.sh
1
```


We connect the 'get-value' with 'set-relay':
```
root@OrangePI:~# cat /usr/local/bin/trigger-relay-update.sh
#!/bin/sh
/usr/local/bin/set-relay.py `/usr/local/bin/get-heater-val.sh`

root@OrangePI:~# chmod +x /usr/local/bin/trigger-relay-update.sh
```


We would like to have a systemd timer,
but since we are on an old machine,
we will use a cron job:
```
root@OrangePI:~# cat /etc/issue
Ubuntu 14.04.5 LTS \n \l
root@OrangePI:~# mkdir -p /etc/cron.d
root@OrangePI:~# apt install cron
root@OrangePI:~# vi /etc/cron.d/relay
root@OrangePI:~# cat /etc/cron.d/relay 
*/3 * * * * root /usr/local/bin/trigger-relay-update.sh 2>&1
```

We now have a smart heater,
controlled by time and multiple people can change the dropbox file,
turning the heater on.

This is a very simple example,
a better way would be
[ifttt](https://www.iotgadgets.com/2018/02/build-diy-google-assistant-controlled-smart-home-light-raspberry-pi/)
or using
[Google Assistant](https://www.makeuseof.com/tag/diy-google-home-assistant-raspberry-pi/).


