$("document").ready(function(){
	$('#address').attr('autocomplete', 'off');
	$("#query").on('keyup',function(e){
		e.preventDefault();
		var address = $("#address").val();

		$("#list").empty();

		$.ajax({
			"url":"http://104.197.66.88:9200/addresses/_search?q=Address:"+address+"~",
			"type":"post",
			success:function(data){

				var source  = $("#address-template").html();
				var template = Handlebars.compile(source);

				for (var i=0;i<data.hits.hits.length;i++){
					var con = {
						"address" : data.hits.hits[i]._source.Address,
						"id" : i,
						"address_id" : data.hits.hits[i]._id
					};

					var html=template(con);
					$('#list').append(html);

				}
			},
			error:function(err){
				console.log(err);
			}
		});
	});

	// select a single address from the list of addresses 
	// and make an ajax call with the single address

	$('body').on('click','li.list-group-item',function(){
		var selected_address = $(this).html();
		$("#address").val(selected_address);
		var address = selected_address;
		$("#list").empty();

		$.ajax({
			"url":"http://104.197.66.88:9200/addresses/_search?q=Address:"+address+"~",
			"type":"post",
			success:function(data){
				// show detailed information for single address
				// we can include google maps too
			},
			error:function(err){
				console.log(err);
			}
		});
	});
});