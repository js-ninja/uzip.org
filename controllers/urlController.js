var router   = require("express").Router();
var Utility  = require("../utility");
var Url      = require("../data/url-schema");

router.route("/urls").post(addUrl)

function addUrl(req, res) {
/*
Checks if the requested url already exists in the databse.
*/
	Url.findOne({longUrl:req.body.longUrl}, function(err, data) {
    if (err)
      res.send(err);
/*
If the requested url already exits in the database then return that particular data
*/
    else if(data) {
    	console.log("already exists",data)
      res.send("http://localhost:3000/"+data.code);
    } else {
    	 	var url = new Url({
			  	code    : Utility.randomString(6,"abcdefghijklm"),
			  	longUrl : req.body.longUrl
			  });
    		console.log("in last else data created",url)
/*
If the requested url doesn't exist in the database then save the data in the database
*/
			  url.save(function (err, data) {
			  	console.log(data)
			    if (err)
			      res.send(err);
			    else
			      res.send("http://localhost:3000/"+data.code);
			  });
			  	//res.send("http://localhost/",data.code)
			}
	});
}
/*function getUrl(req, res) {
	console.log("url--->")
	var reg = req.query.query.split('/')
	console.log("reg", reg)
	//var reg = 
	Url.findOne({code:reg[3]}, function(err, data){
   	//res.send(data.longUrl)
   	console.log("data", data)
   	if(data)
		res.redirect(302, data.longUrl);
		//res.send(data.longUrl)
 });
}*/
module.exports = router;