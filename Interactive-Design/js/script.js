$("document").ready(function(){

	$("#query").on('keyup',function(e){
		e.preventDefault();
		var address = $("#address").val();


		$("#list").empty();

		$.ajax({
			"url":"http://104.197.66.88:9200/addresses/_search?q=Address:"+address+"~",
			"type":"post",
			success:function(data){
				var arr = [];

				for (var i=0;i<data.hits.hits.length;i++){
					console.log(data.hits.hits[i]._source.Address);
					arr.push(data.hits.hits[i]._source.Address);

					console.log(arr);
					$("#address").autocomplete({
				      source: arr
				    });
				}
			},
			error:function(err){

			}
		});
	});
});