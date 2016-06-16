#!/bin/sh
pip install csv2es
csv2es --delete-index --index-name addresses --host http://192.168.99.100:9200/ --doc-type address --import-file unix.txt --tab

