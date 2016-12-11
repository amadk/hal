var express = require('express');
var app = express();

var request = require('request');

require('dotenv').config();
var bingApiKey = process.env.bingApiKey;
var secret = process.env.Secret;
const bcrypt = require('bcrypt-nodejs');

var path = require('path');
var bodyParser = require('body-parser');

var resultController = require('../db/controllers/results.js');
var queryController = require('../db/controllers/queries.js');
var userController = require('../db/controllers/users.js');

const session = require('express-session');

app.use(bodyParser.json());

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true
}));


const routes = ['/', '/signup', '/signin', '/search'];

for (const route of routes) {
  app.get(route, userController.checkAuth, (req, res) => {
    if (route === '/') {
      console.log('searching')
      res.redirect('/search');
    } else {
      res.sendFile(path.join(__dirname, '/../client/assets/index.html'));
    }
  });
}

app.get('/webSearch', function(req, res) {
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
});

/* auth routes -------------------------------------------------------------- */
app.post('/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const response = {};
  userController.findOne({where: {email: email}}, user => {
    if (!user) {
      response.auth = false;
      res.send(response);
    } else {
      userController.comparePassword(user, password, match => {
        if (match) {
          response.auth = true;
          userController.createSession(req, res, user, response);
        } else {
          response.auth = false;
          res.send(response);
        }
      });
    }
  });
});

app.post('/signup', function(req, res) {

  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  userController.findOne({where: {email: email}}, user => {
    if (!user) {
      bcrypt.hash(password, null, null, (err, hash) => {
        req.body.password = hash;
        userController.create(req.body, user => {
          userController.createSession(req, res, user, {auth: true});
        });
      });

    } else {  //if user exists
      res.send('User exists');
    }
  });
});

app.get('/signout', (req, res) => {
  req.session.destroy(() => {
    res.send('session destroyed');
  });
});

/* auth routes end ---------------------------------------------------------- */

app.use(express.static(path.join(__dirname, '../client')));

app.listen(3000, function() {
  console.log('listening on port 3000!');
});