
var express    = require('express')
var mongoose   = require('mongoose')
var path       = require('path')
var bodyParser = require("body-parser")
var app        = express()
var port       = process.env.PORT || 3000
var Url        = require("./data/url-schema")
var Utility    = require("./utility")

//Express request pipeline
app.use(express.static(path.join(__dirname,"../client")))
app.use(bodyParser.json())

/*
Your server must be ready to handle real URLs. When the app first loads at / it will probably work, but as the user navigates around and then hits refresh at /dashboard your web server will get a request to /dashboard. You will need it to handle that URL and include your JavaScript application in the response.
 */
app.get('/dashboard', function (request, response, next){
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'))
  next()
})
app.get('/about', function (request, response, next){
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'))
  next()
})

//Check the code and redirect to the respective website
app.get('/:code', function(req, res) {
	Url.findOne({code:req.params.code}, function(err, data){
   	if(data){
			res.redirect(302, data.longUrl)
   	}
 	})
})

app.post('/addUrl', function (req, res, next) {
	Url.findOne({longUrl:req.body.longUrl}, function(err, data) {
    if (err){
      res.send(err)
    }
    else if(data) {
      res.send("http://localhost:3000/"+data.code);
    } else {
    		var newCode = getCode()
    		checkCode(newCode)
    		.then(function(data){
	    	 	var url = new Url({
				  	code    : data,
				  	longUrl : req.body.longUrl
				  });
				  url.save(function (err, data) {
				    if (err)
				      res.send(err);
				    else
				      res.send("http://localhost:3000/"+data.code);
				  });
    		})
			}
	});
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});

// Connect to our mongo database
mongoose.connect('mongodb://localhost/shortUrl');

//Generate a random code
function getCode() {
	return Utility.randomString(6,"abcdefghijklmnopqrstuvwxyz")
}

//Check if the code is unique
function checkCode(code) {
	return new Promise(function (resolve, reject){
		Url.findOne({code:code}, function(err, data) {
			if(err === null){
				resolve(code)
			}else if(data){
				saveUrlCode(getCode())
			}
		})
	})
}