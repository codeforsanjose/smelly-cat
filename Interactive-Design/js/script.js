// $(function() {
//     var availableTags = [
//       "ActionScript",
//       "AppleScript",
//       "Asp",
//       "BASIC",
//       "C",
//       "C++",
//       "Clojure",
//       "COBOL",
//       "ColdFusion",
//       "Erlang",
//       "Fortran",
//       "Groovy",
//       "Haskell",
//       "Java",
//       "JavaScript",
//       "Lisp",
//       "Perl",
//       "PHP",
//       "Python",
//       "Ruby",
//       "Scala",
//       "Scheme"
//     ];

//     var result = [];
//     $("#address").keyup(function(event){
//          if (event.keyCode >= 48 && event.keyCode <= 57 || event.keyCode >= 65 && event.keyCode <= 90){
//             var address = $("#address").val().toUpperCase();
//             console.log('addres length',address.length);
//              if(address.length!==0){
//                 result = [];
//                 $.ajax({
//                    "url":"http://104.197.66.88:9200/addresses/_search?q=Address:"+address+"~",
//                    "type":"post"
//                 }).done(function(data){
//                      for (var i=0;i<data.hits.hits.length;i++){
//                        result.push(data.hits.hits[i]._source.Address);
//                      }
//                      console.log('length',result.length);
//                      console.log(result);
//                      $("#address").autocomplete({
//                         source: result
//                       });
//                 });
//               }
//           }
//     });
//   });

$("document").ready(function(){
	$("#query").on('keyup',function(e){
		e.preventDefault();
    if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90){
        var address = $("#address").val();

        $("#list").empty();
        var current_address;

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
              current_address = $('#list').children().first().addClass('current');
            }
          },
          error:function(err){
            console.log(err);
          }
        });
    }
    if(e.keyCode==40){
      if($('#list').children().length!==0 && $('#list').children().last().attr('class')!=="list-group-item current"){
        // $('#list').find('.current').removeClass('current');
        // console.log($('#list').find('.current'));
        $('#list').find('.current').removeClass('current').next().addClass('current');
        // console.log($('#list').children().last().attr('class'));
      }
    }

    if(e.keyCode==38){
      console.log("up");
      if($('#list').children().length!==0 && $('#list').children().first().attr('class')!=="list-group-item current"){
        // $('#list').find('.current').removeClass('current');
        // console.log($('#list').find('.current'));
        $('#list').find('.current').removeClass('current').prev().addClass('current');
        // console.log($('#list').children().first().attr('class'));
      }
    }
	});

  $("#query").on('submit',function(e){
        e.preventDefault();
        console.log();
        if($('#address').val().length!==0){
            $('#address').val($('#list').find('.current').html());
            var address_id = $('#list').find('.current').attr('id');
            var address = $('#address').val();

            var url = "http://104.197.66.88:9200/addresses/address/"+address_id;
            console.log(url);

            $.ajax({
              "url":url,
              "type":"get",
              success:function(data){
                console.log(data._source);
                var details = data._source;
                var source  = $("#detail-template").html();
                var template = Handlebars.compile(source);

                var con = {
                          "address":details.Address,
                          "hauler":details.GarbageHauler,
                          "pickup":details.PickupDay,
                          "zip":details.ZIP,
                          "street":details.StreetNumber
                        };
                var html=template(con);
                $('#details').append(html);


                $("#list").empty();
              },
              error:function(err){
                console.log(err);
              }
            });
        }
    });

	// select a single address from the list of addresses 
	// and make an ajax call with the single address

	$('body').on('click','li.list-group-item',function(){
		var selected_address = $(this).html();
		$("#address").val(selected_address);
		var address = selected_address;
    var address_id = $('#list').find('.current').attr('id');
		


    var url = "http://104.197.66.88:9200/addresses/address/"+address_id;
    console.log(url);

    $.ajax({
          "url":url,
          "type":"get",
          success:function(data){
            console.log(data._source);
            $("#list").empty();
            
          },
          error:function(err){
            console.log(err);
          }
        });

		// $.ajax({
		// 	"url":"http://104.197.66.88:9200/addresses/_search?q=Address:"+address+"~",
		// 	"type":"post",
		// 	success:function(data){
  //       console.log(data);
		// 		// show detailed information for single address
		// 		// we can include google maps too
		// 	},
		// 	error:function(err){
		// 		console.log(err);
		// 	}
		// });
	});
});