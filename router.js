module.exports = function(app){

  const firebase = require('firebase');

  const myFirebaseRef = firebase.initializeApp({
    databaseURL: "https://codeforsanjose-1110.firebaseio.com",
    serviceAccount: "data/trashpickup-service.json"
  });

  const db = firebase.database();

  const ref = db.ref("items");

  app.get('/checkFirebase',function(req,res){
    if(db){
        console.log("Connection ready...");
       res.send("Connection ready...");

    }else{
        console.log("Connection failed...");
        res.send("Connection failed...");
    }
  });


/*
submitUser
{
  "phone"   : "XXX-XXX-XXX",
  "time"    : "24:00",
  "day"     : "Monday",
  "address" : "1 Washington St, San Jose, CA",
}

Firesbase Record

{
  "phone"   : "XXX-XXX-XXX",
  "time"    : "24:00",
  "day"     : "Monday",
  "address" : "1 Washington St, San Jose, CA",
  "confirmed" : true,
  "validate"  : "992999", //A random number for validation.
  "validation_sent" : "21:00", //Time when the validation code was sent.
  "validation_ack"  : "21:01"  //Time when the validation code was acknowledge.
}



*/
  app.post('/submitUser',function(req,res){
    const min = 1000000;
    const max = 9999999;
    const status = false;
    const userObj = req.body;
    userObj["validate"] = Math.floor(Math.random() * (max - min)) + min;
    console.log(userObj);

    ref.orderByChild('phone').equalTo(req.body.phone).once('value', function(snap) {

      console.log('--------------------------');
      if(snap.val()){
          console.log('Found');
          res.send({
            "sucess" : "false",
            "reason" : "Number already exists"
          });
      }else{
        // var refKey = ref.push(req.body);
        var refKey = ref.push(userObj);
        console.log(refKey.toString());
        if(refKey.toString()){
          res.send({"sucess":refKey.toString()});
        }else{
          res.send({"sucess":"false"});
        }
      }
      console.log('--------------------------');
    status = true;
    });
    //
    if(status){

    }else{

    }

  });

app.post('/validateUser',function(req,res){

  if(req.body.validate){
    ref.orderByChild('phone').equalTo(req.body.phone).once('value', function(snap) {
      if(snap.val()){
        const userObj =  snap.val();
        const serverCode = userObj[Object.keys(userObj)[0]].validate;
        if(serverCode === Number(req.body.validate)){
          res.send({
            "status" : "Validated"
          })
        }else{
          res.send({
            "status" : "Invalid code entered"
          })
        }
          // console.log();
      }else{
        res.send({
          "status" : "Number not found"
        });
      }
    });
  }else{
    res.send({
      "status" : "No validation code"
    });
  }

});
  //Twilio
  // var twilioClient = require('./twilioClient');

app.post('/sendSMS',function(req,res){

  console.log(req.body.phone);
  console.log(req.body.message);

  var to = req.body.phone;
  var message = req.body.message;

  var config = require('./config');
  var client = require('twilio')(config.accountSid, config.authToken);

    client.messages.create({
      body: message,
      to: to,
      from: config.sendingNumber
  //  mediaUrl: imageUrl
    }, function(err, data) {
      if (err) {
          res.send("Could not notify administrator")
        console.error('Could not notify administrator');
        console.error(err);
      } else {
          res.send("Notified");
        console.log('Administrator notified');
      }
    });

  // twilioClient.sendSms(admin.phoneNumber, messageToSend);
  // res.send("Message Recieved")
});

  // function formatMessage(errorToReport) {
  //   return '[This is a test] ALERT! It appears the server is' +
  //     'having issues. Exception: ' + errorToReport +
  //     '. Go to: http://newrelic.com ' +
  //     'for more details.';
  // };
  //
  exports.notifyOnError = function(appError, request, response, next) {
    admins.forEach(function(admin) {
      var messageToSend = formatMessage(appError.message);
      twilioClient.sendSms(admin.phoneNumber, messageToSend);
    });
    next(appError);
  };




}
