var express = require('express');
var app = express();

var request = require('request');

require('dotenv').config();
var bingApiKey = process.env.bingApiKey;
var secret = process.env.Secret;
const AWSaccessKey = process.env.ACCESSKEYID;
const AWSsecretKey = process.env.SECRETACCESSKEY;

const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();
var bingApiKey = process.env.bingApiKey

var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var extract = require('extract-zip');

var resultController = require('../db/controllers/results.js');
var queryController = require('../db/controllers/queries.js');
var userController = require('../db/controllers/users.js');

const session = require('express-session');
const utils = require('./lib/utilities.js');


app.use(bodyParser.json());

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true
}));


const routes = ['/', '/signup', '/signin', '/search', '/appstore'];

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
              query.getResults().then(function(results) {
                request('https://s3.amazonaws.com/isearchstore/calculator/calculator.html', function(err, response, body) {
                  res.send({results: results, apps: [body]});
                  return;
                });
              });
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
        request('https://s3.amazonaws.com/isearchstore/calculator/calculator.html', function(err, response, body) {
          res.send({results: results, apps: [body]});
        });
      });
    }
  });
  
  // res.send({webPages: {value: [{displayUrl: 'https://en.wikipedia.org/wiki/Bakuman', snippet: 'Bakuman. (バクマン。?) is a Japanese manga series written by Tsugumi Ohba and illustrated by Takeshi Obata, the same creative team responsible for Death Note.', name: 'Bakuman - Wikipedia'}]}})
});

/* s3 upload start ---------------------------------------------------------- */
/** AWS CONFIG **/
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: AWSaccessKey,
  secretAccessKey: AWSsecretKey
});
const s3Bucket = new AWS.S3( { params: {Bucket: 'isearchstore'} } );

/** AWS UPLOAD **/
app.post('/upload', (req, res) => {
  const fileBuffer = utils.decodeBase64Image(req.body.filePath);
  console.log(fileBuffer.data)
  console.log(req.body.fileName);

  fs.writeFile('./server/tmpApp/'+req.body.fileName, fileBuffer.data, (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
    extract('./server/tmpApp/'+req.body.fileName, {dir: './server/tmpApp/'}, function (err) {
      // extraction is complete. make sure to handle the err 
      var folder = req.body.fileName.split('.')[0];
      
      var scriptTag = '<script src=\"https://s3.amazonaws.com/isearchstore/'+folder+'/'+folder+'.js\"></script>'
      var cssTag = '<link rel=\"stylesheet\" type=\"text/css\" href=\"https://s3.amazonaws.com/isearchstore/'+folder+'/'+folder+'.css\" />'
      
      fs.appendFileSync('./server/tmpApp/'+folder+'/'+folder+'.html', scriptTag+cssTag)
      
      fs.readFile('./server/tmpApp/'+folder+'/'+folder+'.html', (err, htmldata) => {
        if (err) throw err;
        console.log('reading html data!', htmldata);
        const awsData = {
          Bucket: 'isearchstore',
          Key: folder+'/'+folder+'.html',
          Body: htmldata
        };
        s3Bucket.putObject(awsData, (err, s3data) => {
          if (err) {
            console.log('Error uploading data: ', s3data, err);
          } else {
            console.log('succesfully uploaded the html for App!', s3data);

            fs.readFile('./server/tmpApp/'+folder+'/'+folder+'.js', (err, jsdata) => {
              if (err) throw err;
              console.log('reading js data!', jsdata);
              const awsData = {
                Bucket: 'isearchstore',
                Key: folder+'/'+folder+'.js',
                Body: jsdata
              };
              s3Bucket.putObject(awsData, (err, s32data) => {
                if (err) {
                  console.log('Error uploading data: ', s32data, err);
                } else {
                  console.log('succesfully uploaded the js for App!', s32data);
                  
                  fs.readFile('./server/tmpApp/'+folder+'/'+folder+'.css', (err, cssdata) => {
                    if (err) throw err;
                    console.log('reading js data!', jsdata);
                    const awsData = {
                      Bucket: 'isearchstore',
                      Key: folder+'/'+folder+'.css',
                      Body: cssdata,
                      ContentType: 'text/css'
                    };
                    s3Bucket.putObject(awsData, (err, s33data) => {
                      if (err) {
                        console.log('Error uploading data: ', s33data, err);
                      } else {
                        console.log('succesfully uploaded the js for App!', s33data);
                        fs.rmdir('./server/tmpApp/'+folder, function() {
                          fs.unlink('./server/tmpApp/'+folder+'/'+folder+'.zip', function() {
                            console.log('removed files and folders!')
                            res.send('Uploaded!');
                          })
                        })
                      }
                    });
                  });
                }
              });
            });
          }
        });

      });
    })
  });
  var date = new Date().getTime(); // fecha.format(new Date(), 'mediumDate').replace(/\s+/g, '');
  let file = req.body.fileName.split('.');
  let imgType = file[1];
  // console.log(req.body.fileName);
  let imgName = file[0] + date;


  const data = {
    Bucket: 'isearchstore',
    Key: imgName + '.' + imgType,
    Body: fileBuffer.data,
  };

  let imgLink = 'https://s3.amazonaws.com/' + data.Bucket + '/' + imgName + '.' + imgType;

  // s3Bucket.putObject(data, (err, data) => {
  //   if (err) {
  //     console.log('Error uploading data: ', data, err);
  //   } else {
  //     console.log('succesfully uploaded the image!');
  //   }
  // });

  // userController.findOne({where: {email: req.session.email}}, user => {
  //   photoController.create({
  //     title: imgName + '.' + imgType, 
  //     imageLink: imgLink, 
  //     description: req.body.description
  //   }, 
  //   photo => {
  //     photo.setUser(user);
  //     console.log('Found user\'s uploaded photo in DB', photo);
  //     res.status(200).send(data);
  //   });
  // });
});
/* s3 upload end ---------------------------------------------------------- */

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