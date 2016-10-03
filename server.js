// noop:1
var server     = require('http').createServer();
var WebSocketServer = require('ws').Server;
var wss        = new WebSocketServer({ server:server });
var express    = require('express')
var mongoose   = require('mongoose')
var path       = require('path')
var bodyParser = require("body-parser")
var app        = express()
var port       = process.env.PORT || 3003;
var Url        = require("./data/url-schema");
var UrlLogs    = require("./data/url-logs-schema");
var Utility    = require('./utility.js');
var url        = require('url')

// Connect to our mongo database
mongoose.connect('mongodb://localhost/uzip_shortUrl');

// WSS Broadcast
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  })
}

// WSS CONNECTION
wss.on('connection', function connection(ws) {
  console.log('Connection Started');

  Url.count(function(err, data){
    ws.send(JSON.stringify({totalCount:data}));
  })

  var location = url.parse(ws.upgradeReq.url, true);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

})


//Express request pipeline
app.use(express.static('./public'));
app.use(bodyParser.json())

app.get('/:code', function(req, res) {
  Url.findOne({code:req.params.code}, function(err, data){
    if(data && data.longUrl){

      //Save entry in log
      saveToLogs(req.params.code, data.longUrl);

      var redirectToUrl = data.longUrl;

      // Check for http/https protocol before redirect
      var re = new RegExp("^(http|https)://", "i");
      if( !re.test(redirectToUrl) ){
        redirectToUrl = 'http://' + redirectToUrl;
      }

      return res.redirect(302, redirectToUrl);
    }
    else {
      return res.end();
    }
  });
});

app.post('/addUrl', function (req, res, next) {

  Url.findOne({longUrl:req.body.longUrl}, function(err, data) {
    if (err){
      res.send(err)
    }
    else if(data) {
      // wss.broadcast(JSON.stringify({"broadcast":"Dont Update Counter"}));
      res.json({
        code:data.code
      })
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
              wss.broadcast(JSON.stringify({"broadcast":{"updateTotalCount":true}}
                )
              );
              res.json({
                code:data.code
              })
          });
        })
      }
  });
});

app.get('/api/trending/today', function (req, res, next) {
  var _data = {};
  var cutoff = new Date();
  cutoff.setDate( cutoff.getDate() - 1 );
  UrlLogs.find({date: {$gt: cutoff} }, function(err, data) {
    if(err) res.end();

    if(data && data.length) {
      data.forEach( function(d) {
        if(_data[d.code]){
          _data[d.code]['counts'] = _data[d.code]['counts'] + 1;
        } else {
          _data[d.code] = {"url":d.longUrl, counts:1};
        }
      })
    }
    res.send(_data);
  })

})


server.on('request', app);
server.listen(port, function () { console.log('Listening on - ' + server.address().port)});

//Generate a random code
function getCode() {
  return Utility.randomString(6,"abcdefghijklmnopqrstuvwxyz")
}

//Check if the code is unique
function checkCode(code) {
  return new Promise(function (resolve, reject){
    Url.findOne({code:code}, function(err, data) {
      if(err === null){
        resolve(code);
      }else if(data){
        checkCode(getCode());
      }
    })
  })
}

function saveToLogs(code, longUrl){
  //Save entry in log
  var urlLogs = new UrlLogs({code:code, longUrl: longUrl});
  urlLogs.save();
}