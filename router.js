module.exports = function(app){

  var twilioClient = require('./twilioClient');
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
    const validate = Math.floor(Math.random() * (max - min)) + min;
    const to = req.body.phone;
    userObj["validate"] = validate;
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
          twilioClient.sendSms(to, validate);
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

app.post('/sendSMS',function(req,res){

  console.log(req.body.phone);
  console.log(req.body.message);

  var to = req.body.phone;
  var message = req.body.message;

  //twilioClient.sendSms(to, message);

  //Use the below code to build the API with status update.
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
});

}
