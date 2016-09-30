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

        ref.once("value", function(snapshot) {
            console.log(snapshot.val());
            console.log('------------------');
            res.send(snapshot.val());
            });

        // res.send("Connection ready...");

    }else{
        console.log("Connection failed...");
        res.send("Connection failed...");
    }
  });

  app.post('/submitUser',function(req,res){

    console.log(req.body);
    res.send({"sucess":"true"});
    // res.send(req.query.phone);

  });

}
