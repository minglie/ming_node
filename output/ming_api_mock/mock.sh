#!/bin/bash
#port=8888
serverfile=""
sw=`echo  $1 | sed 's/[0-9]//g' | sed 's/-//g'`
if [ ${#sw} -eq 0 ];then
port=$1
else
serverfile=$1
port=$2
curl $serverfile > server.js
fi

echo port=$port
echo serverfile=$serverfile
node  $(cd $(dirname ${BASH_SOURCE:-$0});pwd)/ming_api_mock.js  $(pwd)/  $port $@
