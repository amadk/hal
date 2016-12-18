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
var appController = require('../db/controllers/apps.js');

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


/* web search start ---------------------------------------------------------- */

app.get('/webSearch', function(req, res) {
  console.log(fs.unlink)
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
        var appsArr = [];

        appController.findAll({where: {name: req.query.q}}, function(apps) {
          console.log('Finding apps: ', apps);

          var appGetter = function(appIndex) {
            if (appIndex === apps.length) {
              res.send({results: results, apps: appsArr});
              return;
            }
            request(apps[appIndex].get('htmlLink'), function(err, response, body) {
              appsArr.push(body);
              appGetter(appIndex+1);
            });
          }

          if (apps.length > 0) {
            console.log('Apps found!')
            appGetter(0)
          } else {
            console.log('No apps found')
            res.send({results: results, apps: appsArr});
          }

        });
      });
    }
  });
});
/* web search end ---------------------------------------------------------- */

/* s3 upload start ---------------------------------------------------------- */
/** AWS CONFIG **/
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: AWSaccessKey,
  secretAccessKey: AWSsecretKey
});
const s3Bucket = new AWS.S3( { params: {Bucket: 'isearchstore'} } );
var uploadCount = 0;

/** AWS UPLOAD **/
app.post('/upload', (req, res) => {

  if(req.body.fileName.split('.')[1] !== 'zip') {
    res.send('Error, not a zip file!');
    return;
  }

  const fileBuffer = utils.decodeBase64Image(req.body.filePath);

  console.log(fileBuffer.data)
  console.log(req.body.fileName);

  uploadCount++;
  var tmpDir = './server/tmpApps/'+req.body.fileName.split('.')[0]+uploadCount+'/';
  
  //Create temporary directory
  fs.mkdir(tmpDir, function(err) {
    console.log('Created temporary directory!')
    // Write out zip file into temporary path
    fs.writeFile(tmpDir+req.body.fileName, fileBuffer.data, (err) => {
      if (err) {
        console.log('Error in writing zip file:' , err)
      }
      console.log('Completed writting zip file to temporary directory!');

      // Extract zip file inside temporary directory
      extract(tmpDir+req.body.fileName, {dir: tmpDir}, function (err) {
        if (err) {
          console.log('Error in zip file extraction:', err)
        }
        console.log('Extracted zip file!');

        var extractedFolder = req.body.fileName.split('.')[0]+'/';

        // Read file names inside tmpDir/extractedFolder
        fs.readdir(tmpDir+extractedFolder, function(err, files) {
          console.log('Read temporary directory and obtained all file names!');

          var jsFile, htmlFile, cssFile, pngFile, manifestJSON, htmlIndex;
          files.forEach(function(file, index) {
            if (file.split('.')[1] === 'js') {
              jsFile = file;
            } else if (file.split('.')[1] === 'html') {
              htmlFile = file;
              htmlIndex = index
            } else if (file.split('.')[1] === 'css') {
              cssFile = file;
            } else if (file.split('.')[1] === 'png') {
              pngFile = file;
            } else if (file.split('.')[1] === 'json') {
              manifestJSON = file;
            }
          });

          // Html file is moved to the end of the array
          files.push(files.splice(htmlIndex, 1)[0]);

          if (!manifestJSON) {
            res.send('Error, no manifest.json file');
            return;
          }

          // Read manifest.json file
          fs.readFile(tmpDir+extractedFolder+manifestJSON, 'utf8', function(err, fileData) {
            if (err) throw err;

            // Parse the json data into a variable
            var jsonData = JSON.parse(fileData);
            console.log('Read and parsed Manifest file')
            // Check if the app already exists
            appController.findOne({where: {name: jsonData.name}}, function (app) {
              if (app) {  // If the app exists then send back an error to the client
                res.send('App with that name already exists');
                return;
              } else {  //else if new app is being uploaded ->
                // Upload app files to AWS S3
                appController.uploadFiles(fs, s3Bucket, tmpDir, extractedFolder, jsonData, files, 0, function(updatedJSON) {
                  console.log('Uploaded all files to AWS!');
                  // Get current user
                  userController.findOne({where: {email: req.session.email}}, function(user) {
                    // Save Manifest file data to database
                    user.createApp(updatedJSON).then(function(app) {
                      console.log('Saved app data!')
                      // Remove all files and folders
                      appController.removeFiles(fs, tmpDir, extractedFolder, req.body.fileName, files, 0, function() {
                        console.log('Remoed all files and sent response!')
                        //Decrement upload counter
                        uploadCount--;
                        // Send response
                        res.send('Uploaded all files and saved all data!');
                      })
                    })
                  })
                })                  
              }
            });
          });
        });
      });
    });
  });
});


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