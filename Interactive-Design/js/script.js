$("document").ready(function(){
	$("#query").on('submit',function(e){
		e.preventDefault();
		var address = $("#address").val();

		$.ajax({
			"url":"http://104.197.66.88:9200/addresses/_search?q=Address:"+address+"~",
			"type":"post",
			success:function(data){
				console.log(data.hits.hits);
			},
			error:function(err){

			}
		});
	});
});