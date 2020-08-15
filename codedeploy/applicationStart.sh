#!/bin/bash
ls -al
# forever start -c "serve -p 8080" /home/ubuntu/webapp-ui/build 
cd /home/ubuntu/webapp-ui/build
sudo serve -p 8080 > /dev/null 2> /dev/null < /dev/null &
ps aux