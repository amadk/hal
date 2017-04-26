var express = require('express');

var forEachAsync = require('forEachAsync').forEachAsync;
var natural = require('natural');

var userController = require('../../db/controllers/users/users.js');
var appController = require('../../db/controllers/command/apps.js');
var intentController = require('../../db/controllers/command/intents.js');
var commandController = require('../../db/controllers/command/commands.js');


var classifierMaker = function(apps, callback) {

    console.log('A REQUEST')
  // var classifiers = {
  //   appClassifier: appClassifier,
  //   time: {
  //     intentClassifier: intentClassifier,
  //     commandClassifiers: {
  //       getTime: commandClassifier,
  //       setAlarm: commandClassifier
  //     }
  //   } 
  //   calculator: {
  //     intentClassifier: intentClassifier,
  //     commandClassifiers: {
  //       calculate: commandClassifier,
  //       multiply: commandClassifier
  //     }
  //   }
  // };
  var classifiers = {}
  classifiers['appClassifier'] = new natural.BayesClassifier();

    forEachAsync(apps, function(next1, appName, index) {
      appController.findOne({where: {name: appName}}, function(app) {
        if(!app) {
          return;
        }
        classifiers[app.get('htmlLink')] = {
          intentClassifier: new natural.BayesClassifier(),
          commandClassifiers: {}
        };
        app.getIntents().then(function(intents) {

          forEachAsync(intents, function(next2, intent, index) {
            classifiers[app.get('htmlLink')]['commandClassifiers'][intent.get('intent')] = new natural.BayesClassifier();
            intent.getCommands().then(function(commands) {

              commands.forEach(function(command) {
                classifiers.appClassifier.addDocument(command.get('sampleCommand'), app.get('htmlLink'));
                classifiers[app.get('htmlLink')]['intentClassifier'].addDocument(command.get('sampleCommand'), intent.get('intent'));
                classifiers[app.get('htmlLink')]['commandClassifiers'][intent.get('intent')].addDocument(command.get('sampleCommand'), command.get('command'))
              })
              classifiers[app.get('htmlLink')]['commandClassifiers'][intent.get('intent')].train();
              next2();
            })
          }).then(function() {
            classifiers[app.get('htmlLink')]['intentClassifier'].train()
            next1()
          })
        })
      })
    }).then(function() {
      classifiers.appClassifier.train();
      classifiers.commandParser = commandParser
      callback(classifiers);
    })
  // }
}


var commandParser = function(input, sampleCommand) {

  var obj = {};

  input = input.split(' ');
  sampleCommand = sampleCommand.split(' ')
  
  sampleCommand.forEach(function(i, index) {
    if (i[0] === '{' && i[i.length-1] === '}') {
      var propertyName = i.split('').slice(1, i.length-1).join('');

      var leftWordIndex
      var rightWordIndex;

      if(index === 0) {
        leftWordIndex = 0;
      } else {
        leftWordIndex = input.indexOf(sampleCommand[index-1])+1;
      }

      if (index === sampleCommand.length-1) {
        rightWordIndex = input.length
      } else {
        rightWordIndex = input.indexOf(sampleCommand[index+1])
      }
      

      obj[propertyName] = input.slice(leftWordIndex, rightWordIndex).join(' ');
    }
  });

  obj['command'] = input.join(' ')

  return obj
}


module.exports = classifierMaker;









// app.post('/appCommand', function (req, res) {
//   var userCommand = req.body.command;

//   var samples = ['3*9', 'whats 1+1', 'determine 4*9', 'calculate 56/8', 'what is 3+7', 'evaluate sqrt(4) via the calculator app']
//   var dataSamples = ['{math}', 'whats {math}', 'determine {math}', 'calculate {math}', 'what is {math}', 'evaluate {math} via the calculator app']

//   var istSamples = ['internet speed test', 'do an internet speed test', 'perform an internet speed test', 'could you do an internet speed test']
//   // var dataSamples = ['{math}', 'whats {math}', 'determine {math}', 'calculate {math}', 'what is {math}', 'evaluate {math} via the calculator app']

//   var commandClassifier = new natural.BayesClassifier();

//   samples.forEach(function(sample, index) {
//     commandClassifier.addDocument(sample, dataSamples[index]);
//   })

//   commandClassifier.train();

//   samples.forEach(function(sample) {
//     appClassifier.addDocument(sample, 'calculator');    
//   });




//   appClassifier.train();

//   var appName = appClassifier.classify(userCommand);

//   closestCommand = commandClassifier.classify(userCommand);
//   console.log(closestCommand)

//   var parsedCommand = commandParser(userCommand, closestCommand);




//   appController.findOne({where: {name: appName}}, function(app) {
//     res.send({app: app, parsedCommand: parsedCommand});
//   })
// });