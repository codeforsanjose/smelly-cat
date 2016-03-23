var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'http://104.197.66.88:9200',
	log: 'trace'
});
module.exports = function findPress(query) {
	var search = client.search({
	  q: query
	}).then(function (body) {
	  var hits = body.hits.hits;
	  var size = Object.keys(hits).length;
	  var x = document.createElement("SELECT");
      x.setAttribute("id", "mySelect");
	  
	  //console.log(Object.keys(hits).length);
	  var element = document.getElementById("results");
	  var list = document.createElement('ul');
	  for(var i = 0; i < size; i++) {
	  	var z = document.createElement("option");
	  	var item = document.createElement('li');
	  	var e = hits[i];
	  	item.appendChild(document.createTextNode(e._source.Address));
	  	list.appendChild(item);
	  	var keyaddress = e_source.Address + "key";
	  	z.setAttribute("value", keyaddress);
	  	var t = document.createTextNode(e_source.Address);
	    z.appendChild(t);
	    document.getElementById("mySelect").appendChild(z);
	  	//console.log(e._source.Address);
	  }
	  element.appendChild(x);
	  //element.appendChild(list);
	  /* create list
	  */
	  document.getElementById("txtHouseNo").innerHTML = "95129";
	  console.log("hits returned");
	}, function (error) {
	  console.trace(error.message);
	});
	return search; 
}
