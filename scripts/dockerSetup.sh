#!/bin/sh
echo `pwd`
docker-machine start
docker-machine env
eval $(docker-machine env)
docker build -t pickup_portal -f Dockerfile .
docker run -d --name portal_instance -p 9200:9200 -p 3000:3000 pickup_portal
ln -s `pwd`/data/unix.txt `pwd`/unix.txt
#pip install csv2es
docker exec -i portal_instance /bin/bash << HERE
echo "docker container is running!"
HERE
#csv2es --delete-index --index-name addresses --host http://192.168.99.100:9200/ --doc-type address --import-file unix.txt --tab


