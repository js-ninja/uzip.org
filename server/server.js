
var express    = require('express')
var mongoose   = require('mongoose')
var path       = require('path')
var bodyParser = require("body-parser");

var app        = express()
var port       = process.env.PORT || 3000

//controllers
var urlController = require("./controllers/urlController");

/*
To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
 */
//Express request pipeline
app.use(express.static(path.join(__dirname,"../client")))
app.use(bodyParser.json())
app.use("/api", urlController);

/*
Your server must be ready to handle real URLs. When the app first loads at / it will probably work, but as the user navigates around and then hits refresh at /dashboard your web server will get a request to /dashboard. You will need it to handle that URL and include your JavaScript application in the response.
 */
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../client', 'index.html'))
})

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
});

// Connect to our mongo database
mongoose.connect('mongodb://localhost/shortUrl');
 /*var db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'));
 db.once('open', function() {
 	console.log("mongo connected")
});*/