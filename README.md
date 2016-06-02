# Trash Pickup Portal

Trash Pickup Portal provides a user-friendly way to search for information about trash pickup times for San Jose.

### What this Solves
The current implementation on the San Jose website is a bit difficult to use. This project aims to improve the user experience and functionality.

### Technologies

* Python, Elastic Search, HTML/CSS, Javascript, Bootstrap, Docker, Twilio API

### Getting Started

Step 1: Clone this repo.  

Step 2: Install Docker.  Get an instance: `docker pull elasticsearch`
This is from [https://github.com/dockerfile/elasticsearch](here)

Step 3: Load ElasticSearch with docker: `docker run -d -p 9200:9200 elasticsearch`

Step 4: Check if elasticsearch is working at [http://192.168.99.100:9200/_cat/indices?v](indices)
This accesses the default docker ip.  Check your ip with 'docker-machine env'

Step 5: Install csv2es with python two ('pip install csv2es')

Step 6: Populate ElasticSearch with data.  Go to ~/Github/trash-pickup-portal/data and run:
'csv2es --delete-index --index-name addresses --host http://192.168.99.100:9200/ --doc-type address --import-file unix.txt --tab'

Step 7: Go into the base folder (/trash-pickup-portal) and run 'python -m SimpleHTTPServer' for python 2 or for python3 'python3 -m http.server' 

Step 8: Website should be at [http://localhost:8000/www/](localhost:8000/www/)

###AWS DNS:

ec2-52-33-189-96.us-west-2.compute.amazonaws.com
Ask ameyades on slack for help
