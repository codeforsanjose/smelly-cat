var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var dotenv = require('dotenv');
dotenv.load();

var routes = require('./routes/index');
var users = require('./routes/users');

var sid = process.env.SID;
var token = process.env.Token;
var twilio_number = process.env.number;
var client = require('twilio')(sid, token);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    console.log("hello");
});


app.post('/sendSMS',function(req,res){
    var details=req.body;
    console.log(details.number);
    client.messages.create({
        to: details.number,
        from: twilio_number,
        body: details.message
    }, function(err, message) {
        console.log(message.sid);
        res.send("success");
    });
});

app.post('/verifyAccount',function(req,res){
    var details=req.body;
    console.log(details);

    client.outgoingCallerIds.create({
        friendlyName: details.name,
        phoneNumber: details.number
    }, function(err, callerId) {
        if(err){
            console.log(err);
            return;
        }
        process.stdout.write(callerId.sid);
    });

    // var verification_code = Math.floor(Math.random()*90000) + 100000;
    // console.log(verification_code);

    // client.outgoingCallerIds.post({ phoneNumber: details.number }, function(err, data) {
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log(data.verificationCode);
    //     res.send(data.verificationCode);

    // });

});

module.exports = app;
