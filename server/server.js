var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/assets/index.html'));
});

app.use(express.static(path.join(__dirname, '../client')));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});