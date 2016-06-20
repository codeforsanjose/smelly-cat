[![Stories in Ready](https://badge.waffle.io/codeforsanjose/trash-pickup-portal.png?label=ready&title=Ready)](https://waffle.io/codeforsanjose/trash-pickup-portal)
# Trash Pickup Portal

Trash Pickup Portal provides a user-friendly way to search for information about trash pickup times for San Jose.

### What this Solves
The current implementation on the San Jose website is a bit difficult to use. This project aims to improve the user experience and functionality.

### Technologies

* Python, Elastic Search, HTML/CSS, Javascript, Bootstrap, Docker, Twilio API

### Getting Started

Step 1: Clone this repo.  

Step 2: Install Docker.  Get an instance: `docker pull elasticsearch`
This is from [here](https://github.com/dockerfile/elasticsearch)

Step 3: In root of cloned repo, run `docker build -t pickup_portal -f Dockerfile . `

Step 4:  `docker run -d -p 9200:9200 -p 3000:3000 pickup_portal`

Step 5: Check if elasticsearch is working at [indices](http://192.168.99.100:9200/_cat/indices?v)
This accesses the default docker ip.  Check your ip with `docker-machine env`

Step 6: Install csv2es with python 2.7 `pip install csv2es`

Step 7: Populate ElasticSearch with data.  Go to ~/Github/trash-pickup-portal/data and run:
`csv2es --delete-index --index-name addresses --host http://192.168.99.100:9200/ --doc-type address --import-file unix.txt --tab`

Step 8: Go into the base folder (/trash-pickup-portal) and run `python -m SimpleHTTPServer` for python 2 or for python3 `python3 -m http.server'`

Step 9: Website should be at [http://localhost:8000/www/](http://localhost:8000/www/)


### Run Bash on your docker instance:

 docker exec -i -t \<instance name\>  /bin/bash

###AWS DNS:

ec2-52-33-189-96.us-west-2.compute.amazonaws.com
Ask ameyades on slack for help

###UI Reference:

UI Library: React.js
Server: express.js (node.js)

Run ```npm install``` to install dependencies

Run ```npm start``` to start the Server

Application runs on port 3000.

Main server file : server.js

Main UI file: main.js

All the components will be under /app/components
Any new component should go under components



### City of San Jose backend:
http://services2.arcgis.com/KCFBdu4OIPKQGsVV/ArcGIS/rest/services/esd_collection_services/FeatureServer

## Eventual end goal:
http://simplicity.ashevillenc.gov/#/topics/trash?searchtext=92%20PATTON%20AVE%20A,%2028801&searchby=address&id=228201&view=simple&validViews=simple
