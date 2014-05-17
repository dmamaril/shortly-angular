var express = require('express');
var partials = require('express-partials');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/client'));
  // app.use('bower_components', express.static(__dirname + '/bower_components'));
  // app.use(express.cookieParser('shhhh, very secret'));
  // app.use(express.session());
});

var renderHome = function (req, res) {
  res.sendfile('./client/templates/home.html');
};

var renderCreate = function (req, res) {
  res.sendfile('./client/templates/shorten.html');
};

app.get('/', renderHome);
app.get('/create', renderCreate);

app.get('/links',  handler.fetchLinks);
app.post('/links', handler.saveLink);

app.get('/*', handler.navToLink);


module.exports = app;
