# trash-pickup-portal
Friendlier searching and information about Trash pickup times for San Jose

The [current implementation on the San Jose website](https://www.sanjoseca.gov/index.aspx?nid=3079) is a bit difficult to use. This project aims to improve the user experience and functionality.

The build will be:
- Python to interface with the Hauler Dataset and featurize the data
- Elastic Search to hold the data and create the search api
- Some type of html-javascript to visualize the search and results


The source data is [here](http://data.sanjoseca.gov/dataviews/225973/san-jose-hauler-data/).  More info on this problem on the original [issue](https://github.com/codeforsanjose/Project-Ideas/issues/54).

[![Stories in Ready](https://badge.waffle.io/codeforsanjose/trash-pickup-portal.png?label=ready&title=Ready)](http://waffle.io/codeforsanjose/trash-pickup-portal)
