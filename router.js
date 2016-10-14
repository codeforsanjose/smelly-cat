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

  app.post('/submitUser',function(req,res){

    const status = false;
    console.log(req.body.phone);

    ref.orderByChild('phone').equalTo(req.body.phone).once('value', function(snap) {

      console.log('--------------------------');
      if(snap.val()){
          console.log('Found');
          res.send({
            "sucess" : "false",
            "reason" : "Number already exists"
          });
      }else{
        var refKey = ref.push(req.body);
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
