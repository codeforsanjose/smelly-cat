$("document").ready(function(){
     function send_sms(recipient_number,message){
        var details = {
          number:recipient_number,
          message:message
        };

        $.ajax({
          type:"POST",
          contentType: "application/json",
          url:"/sendSMS",
          data:JSON.stringify(details),
          success:function(res){
              console.log(res);
              $('#message_form').find("input[type=text], textarea").val("");
            }
        });
      }

      function send_verification(number, name){
        var details = {
          number: number,
          name: name
        };

        $.ajax({
          type:"POST",
          contentType: "application/json",
          url:"/verifyAccount",
          data:JSON.stringify(details),
          success:function(res){
              console.log(res);
              $('#verification_form').find("input[type=text], textarea").val("");
            }
        });

      }

      //send sms

      $("#message_form").submit(function(e){
        e.preventDefault();

        if($("#number").val()!=="" && $("#message").val()!==""){
            var number = '+1'+$("#number").val();
            var message = $("#message").val();
            send_sms(number,message);
        }else{
          alert("You must enter both number and message");
        }
      });

      //send verification

      $("#verification_form").submit(function(e){
        e.preventDefault();

        if($("#verification_number").val()!==""){
            var number = '+1'+$("#verification_number").val();
            var name = $("#verifier_name").val();
            send_verification(number, name);
        }else{
          alert("You must enter a valid phone number to verify");
        }
      });
});
