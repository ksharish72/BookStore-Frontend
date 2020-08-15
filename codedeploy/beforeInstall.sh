#!/bin/bash
sudo rm -rf /home/ubuntu/webapp-ui
cd $HOME
# sudo pkill -f node #stop all node process
#sudo kill -9 $(sudo lsof -t -i:8080) #kill the 8080 port 
#uid=$(forever list | grep serve | cut -c24-27) && forever stop $uid #stop forever process
# forever stopall
if ps -p $(lsof -t -i:8080) > /dev/null
then
   echo "$(lsof -t -i:8080) is running"
   # Do something knowing the pid exists, i.e. the process with $PID is running
   kill -9 $(lsof -t -i:8080) #kill the 3000 port 
fi