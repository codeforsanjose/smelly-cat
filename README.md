  [![Stories in Ready](https://badge.waffle.io/codeforsanjose/trash-pickup-portal.png?label=ready&title=Ready)](https://waffle.io/codeforsanjose/trash-pickup-portal)
# Trash Pickup Portal

Trash Pickup Portal provides a user-friendly way to search for information about trash pickup times for San Jose.

### What this Solves
The current implementation on the San Jose website is a bit difficult to use. This project aims to improve the user experience and functionality.

### Technologies

* Python, Elastic Search, HTML/CSS, Javascript, Bootstrap, Docker, Twilio API, Firebase

### Getting Started

Step 1: Clone this repo.  

Step 2: Install Docker.  Get an instance: `docker pull elasticsearch`
This is from [here](https://github.com/dockerfile/elasticsearch)

Step 3: In root of cloned repo, run `docker build -t pickup_portal -f . `

Step 4:  `docker run -d -p 9200:9200 -p 3000:3000 pickup_portal`

Step 5: Check if elasticsearch is working at [indices](http://0.0.0.0:9200/_cat/indices?v

Step 6: Install csv2es with python 2.7 `pip install csv2es`

Step 7: Populate ElasticSearch with data.  Go to ~/Github/trash-pickup-portal/data and run:
`csv2es --delete-index --index-name addresses --host http://0.0.0.0:9200/ --doc-type address --import-file unix.txt --tab`
*Do this everytime you start the instance.

Step 8: Run ```npm install``` to install dependencies

Step 9: Run ```npm start``` to start the Server


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
