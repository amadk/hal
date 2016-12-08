var express = require('express');
var app = express();

var request = require('request');
var bodyParse = require('body-parser');

require('dotenv').config();
var bingApiKey = process.env.bingApiKey

var path = require('path');
var bodyParser = require('body-parser');

var resultController = require('../db/controllers/results.js');
var queryController = require('../db/controllers/queries.js');

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/assets/index.html'));
});

app.get('/search', function(req, res) {
  queryController.findOne({where: {query: req.query.q}}, function(query) {
    if (!query) {
      var options = {
        url: 'https://api.cognitive.microsoft.com/bing/v5.0/search?q=' + req.query.q,
        headers: {
          'Ocp-Apim-Subscription-Key': bingApiKey
        }
      }
      request(options, function(err, response, body) {
        var results = JSON.parse(body).webPages.value;
        queryController.create({query: req.query.q}, function(query) {
          var addResults = function (resultIndex) {
            if (resultIndex === results.length) {
              res.send(results);
              return;
            }
            resultController.create({
              name: results[resultIndex].name,
              displayUrl: results[resultIndex].displayUrl,
              snippet: results[resultIndex].snippet
            }, function(result) {
              query.addResult(result).then(function() {
                addResults(resultIndex+1);                
              })
            })
          }
          addResults(0);
        });
      });
    } else {
      query.getResults().then(function(results) {
        res.send(results);
      })
    }
  });
  
  // res.send({webPages: {value: [{displayUrl: 'https://en.wikipedia.org/wiki/Bakuman', snippet: 'Bakuman. (バクマン。?) is a Japanese manga series written by Tsugumi Ohba and illustrated by Takeshi Obata, the same creative team responsible for Death Note.', name: 'Bakuman - Wikipedia'}]}})
})

app.use(express.static(path.join(__dirname, '../client')));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});