var express = require('express');
var app = express();

var request = require('request');

require('dotenv').config();
var port = process.env.Port
var bingSearchApiKey = process.env.bingSearchApiKey;
var bingAutoSuggestApiKey = process.env.bingAutoSuggestApiKey;
var secret = process.env.Secret;
const AWSaccessKey = process.env.ACCESSKEYID;
const AWSsecretKey = process.env.SECRETACCESSKEY;

const bcrypt = require('bcrypt-nodejs');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var extract = require('extract-zip');

// var resultController = require('../db/controllers/search/results.js');
// var queryController = require('../db/controllers/search/queries.js');
// var userController = require('../db/controllers/users/users.js');
// var appController = require('../db/controllers/command/apps.js');
// var commandController = require('../db/controllers/command/commands.js');
// var intentController = require('../db/controllers/command/intents.js');


var authRouter = require('./routers/users.js');


const session = require('express-session');
const utils = require('./lib/utilities.js');

// var natural = require('natural');
var forEachAsync = require('forEachAsync');

// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// server.listen(8000);

app.use(bodyParser.json());


var sessionMiddleware = session({
  secret: secret,
  resave: false,
  saveUninitialized: true
})

app.use(sessionMiddleware);

// io.use(function(socket, next) {
//     sessionMiddleware(socket.request, socket.request.res, next);
// });

const routes = ['/', '/home', '/appStore', '/profile'];
// const routes = ['/'];

for (const route of routes) {
  app.get(route, (req, res) => {
    // userController.createSession(req, res, {email: '@', password: 'p'}, function() {
      res.sendFile(path.join(__dirname, '/../client/web/assets/index.html'));      
    // });
  });
}

/* auth routes -------------------------------------------------------------- */

app.use('/auth', authRouter);
app.use('/auth', authRouter);
app.use('/auth', authRouter);

/* auth routes end ---------------------------------------------------------- */

/* app command start ---------------------------------------------------------- */

// var serialize = (obj) => {
//   var str = [];
//   for(var p in obj)
//     if (obj.hasOwnProperty(p)) {
//       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//     }
//   return str.join("&");
// }

// io.on('connection', function (socket) {

//   var sendApps = function(apps) {
//     require('./routers/command.js')(apps, function(classifiers) {
//       socket.on('command', function(msg) {
//         console.log(msg.command)

//         // Determine app command, intent and command template using the classifiers

//         var appHtmlLink = classifiers.appClassifier.classify(msg.command);
//         var intent = classifiers[appHtmlLink]['intentClassifier'].classify(msg.command);
//         var templateCommand = classifiers[appHtmlLink]['commandClassifiers'][intent].classify(msg.command)
//         var templateCommandTest = classifiers[appHtmlLink]['commandClassifiers'][intent].getClassifications(msg.command)
        
//         console.log('templateCommand:', templateCommandTest)
        
//         console.log('templateCommand2:', natural.JaroWinklerDistance(msg, templateCommandTest[4].value))

//         // Get the app data from the database

//         appController.findOne({where: {htmlLink: appHtmlLink}}, function(app) {
//           intentController.findOne({where: {app_id: app.get('id'), intent: intent}}, function(intentObj) {
//             intentObj.getCommands().then(function(commands) {
//               var closestCommandDistance = 0;
//               var closestCommand = '';

//               // Identify closest command template

//               commands.forEach(function(command) {
//                 var currentDistance = natural.JaroWinklerDistance(msg.command, command.get('command'))
//                 if (currentDistance > closestCommandDistance) {
//                   closestCommandDistance = currentDistance;
//                   closestCommand = command.get('command');
//                 }
//               })

//               templateCommand = closestCommand;

//               var commandData = classifiers.commandParser(msg.command, templateCommand)
//               commandData.intent = intent;
//               console.log(commandData)

//               // Serialize the data into the app html link
//               appHtmlLink += '?' + serialize(commandData)

//               // Send all data back to client
//               socket.emit('response', appHtmlLink)
              
//             })
//           })
//         })
//       });
//     })
//   }

//   // console.log('****', socket.request.session)
//   console.log('id:', socket.id)
//     if (session.email) {
//       userController.findOne({where: {email: session.email}}, function(user) {
//         user.getApps().then(function(apps) {
//           sendApps(apps)
//         })
//       })
//     } else {
//       sendApps(['calculator'])
//     }
// });


/* app command end ---------------------------------------------------------- */


/* web search start ---------------------------------------------------------- */

app.get('/search', function(req, res) {
  request({
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/search?q='+req.query.q,
    headers: {
      'Ocp-Apim-Subscription-Key': bingSearchApiKey
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  })
});

app.get('/autoSuggest', function(req, res) {
  request({
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/Suggestions?q='+req.query.q,
    headers: {
      'Ocp-Apim-Subscription-Key': bingAutoSuggestApiKey
    }
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  })
})

/* web search end ---------------------------------------------------------- */

/* s3 upload start ---------------------------------------------------------- */
/** AWS CONFIG **/

/* s3 upload end ---------------------------------------------------------- */



/* app store start ---------------------------------------------------------- */
app.get('/apps', function(req, res) {
  console.log('**************app store request')
  appController.findAll({}, function(apps) {
    res.send(apps)
  })
})

/* app store end ---------------------------------------------------------- */

app.use(express.static(path.join(__dirname, '../client')));

app.listen(port, function() {
  console.log('listening on port 3000!');
});
