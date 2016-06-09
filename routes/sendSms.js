var express = require('express');
var router = express.Router();

var token = process.env.Token;
var twilio_number = process.env.number;
var client = require('twilio')(sid, token);

/* GET home page. */
router.get('/', function(req, res, next) {
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

module.exports = router;
