
var express    = require('express')
var mongoose   = require('mongoose')
var path       = require('path')
var bodyParser = require("body-parser")
var cors       = require("cors")
var app        = express()
var port       = process.env.PORT || 3000
var Url        = require("./data/url-schema");


//Express request pipeline
app.use(express.static(path.join(__dirname,"../client")))
app.use(bodyParser.json())
app.use(cors());

/*
Your server must be ready to handle real URLs. When the app first loads at / it will probably work, but as the user navigates around and then hits refresh at /dashboard your web server will get a request to /dashboard. You will need it to handle that URL and include your JavaScript application in the response.
 */
app.get('*', function (request, response, next){
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'))
  next()
})

app.get('/:code', function(req, res) {
	console.log("reg", req.params.code)
	Url.findOne({code:req.params.code}, function(err, data){
   	console.log("data", data)
   	if(data)
			res.redirect(302, data.longUrl)
		else
			res.end()
 	})
})

app.post('/addUrl', function (req, res, next) {
	console.log("on create");
	Url.findOne({longUrl:req.body.longUrl}, function(err, data) {
    if (err)
      res.send(err);
    else if(data) {
    	console.log("already exists",data)
      res.send("http://localhost:3000/"+data.code);
    } else {
    	 	var url = new Url({
			  	code    : Utility.randomString(6,"abcdefghijklm"),
			  	longUrl : req.body.longUrl
			  });
    		console.log("in last else data created",url)
			  url.save(function (err, data) {
			  	console.log(data)
			    if (err)
			      res.send(err);
			    else
			      res.send("http://localhost:3000/"+data.code);
			  });
			}
	});
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});

// Connect to our mongo database
mongoose.connect('mongodb://localhost/shortUrl');