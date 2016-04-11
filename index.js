var express = require('express')
var app = express();
fs = require('fs');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


var livereload = require('livereload');
var reloadServer = livereload.createServer();
reloadServer.watch([__dirname + "/public/css", __dirname + "/public/js", __dirname + "/views"]);



app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function (req, res)
{
  res.render('home.html');
})
var Parse = require('parse/node');
var PARSE_APP_ID = "hY3y4qnV3BAVNBxbSZVF4I4flC053j8p75I5XbOi"
var PARSE_JAVASCRIPT_KEY = "IgukkEetAsOH8kslRiyiZC8pwCO55lyd5beM7AJY"
Parse.initialize(PARSE_APP_ID, PARSE_JAVASCRIPT_KEY);

app.post('/requestInvite', function(req,res){

  console.log(req.body.email)
  var email = req.body.email;

    var Signup = Parse.Object.extend("Signup");
    var signup = new Signup();


    signup.set("email", email);

    signup.save();
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }, null, 3));
})

////////////////////////////////////////////////
/////////////////*~  Run App ~*/////////////////
////////////////////////////////////////////////

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
