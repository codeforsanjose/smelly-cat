module.exports = function(app){

  const firebase = require('firebase');

  const myFirebaseRef = firebase.initializeApp({
    databaseURL: "https://codeforsanjose-1110.firebaseio.com",
    serviceAccount: "data/trashpickup-service.json"
  });

  const db = firebase.database();

  const ref = db.ref("items");

  app.get('/getEnv',function(req,res){
    if(isDeveloping){
        console.log("In dev mode");
        res.send("development");
    }else{
        console.log("In prod mode");
        res.send("production");
    }
  });

  app.get('/checkFirebase',function(req,res){
    if(db){
        console.log("Connection ready...");
        // ref.orderByChild('phone').equalTo('1234567').once('value', function(snap) {
        //   res.send(snap.val());
        // });
        // ref.once("value", function(snapshot) {
        //     console.log(snapshot.val());
        //     console.log('------------------');
        //     res.send(snapshot.val());
        //     });

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

}
