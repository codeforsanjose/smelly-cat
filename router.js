module.exports = function(app){

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
        res.send("Connection ready...");
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
