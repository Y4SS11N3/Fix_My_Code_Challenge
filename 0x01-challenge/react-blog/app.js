var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var posts = require('./routes/post.routes');
var config = require('./config.js');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

app.use('/', posts);

// Error handling middleware
app.use(function (err, req, res, next) {
  if (!err.status || err.status !== 404) {
    err.status = 500;
  }
  console.log(err);
  res.status(err.status);
  res.sendFile(path.resolve(__dirname + '/views/error/' + err.status + '.html'));
});

app.listen(config.port, function () {
  console.log('Listening on ' + config.baseUrl);
});
