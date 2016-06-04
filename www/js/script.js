var lastAddress = null;

$("document").ready(function(){
    $('#spinner').hide();

    $("#query").on('keyup',function(e){
        //console.log('keyup', e.keyCode);
        e.preventDefault();

        if(e.keyCode==40){ //key: down arrow
            if($('#list').children().length!==0 && $('#list').children().last().attr('class')!=="list-group-item current"){
                $('#list').find('.current').removeClass('current').next().addClass('current');
            }
        }

        if(e.keyCode==38){ //key: up arrow
            if($('#list').children().length!==0 && $('#list').children().first().attr('class')!=="list-group-item current"){
                $('#list').find('.current').removeClass('current').prev().addClass('current');
            }
        }

        var address = $("#address").val();
        if (address && address != lastAddress) {
            // if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90){ // key: 0-9 or a-z
            lastAddress = address;

            $.ajax({
                "url":"http://192.168.99.100:9200/addresses/_search?q=Address:"+address+"~",
                "type":"post",
                success:function(data){
                    if (address == $('#address').val()) {
                        console.log('response for address:', address);

                        $('#list').empty();

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
                            $('#list').children().first().addClass('current');

                        }
                    }


                },
                error:function(err){
                    console.log(err);
                }
            });
        }

    });

    $("#query").on('submit',function(e){
        e.preventDefault();

        if($('#address').val().length!==0){
            $('#address').val($('#list').find('.current').html());
            var address_id = $('#list').find('.current').attr('id');
            var address = $('#address').val();

            lastAddress = address;
            $('#list').empty();

            searchDetail(address_id);
        }
    });

    // select a single address from the list of addresses
    // and make an ajax call with the single address

    $('body').on('click','li.list-group-item',function(){

        var selected_address = $(this).html();
        $("#address").val(selected_address);
        var address = selected_address;
        var address_id = $(this).attr('id');

        lastAddress = address;
        $('#list').empty();

        searchDetail(address_id);
    });



    // Search detail by address id and display information
    function searchDetail(address_id) {
        var url = "http://192.168.99.100:9200/addresses/address/"+address_id;
        console.log('searchDetail', url);

        $('#spinner').show();
        $.ajax({
            "url":url,
            "type":"get",
            success:function(data){
                $('#spinner').hide();
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
                $('#details').html(html);
            },
            error:function(err){
                $('#spinner').hide();
                console.log(err);
            }
        });
    }

});
