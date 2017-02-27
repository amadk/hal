var Command = require('../../models/index.js').Command;
var appController = require('./apps.js');

var create = function(props, callback) {
  Command.build(props)
  .save()
  .then(function(command) {
    callback(command);
  }).catch(function(err) {
    console.log(err);
  });
};

var addCommands = function(triggerWords, app, callback) {
  var addCommand = function(commandIndex) {
    if (commandIndex === triggerWords.length) {
      callback()
      return;
    }
    Command.findOrCreate({command: triggerWords[commandIndex]}, function(command) {
      command.addApp(app).then(function() {
        addCommand(commandIndex+1);        
      });
    });
  }
  addCommand(0);
}

var findAll = function(callback) {
  Command.findAll().then(function(commands) {
    callback(commands);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(commandObj, callback) {
  Command.findOne(commandObj).done(function(command) {
    console.log('🍊  Found one command in db:', command);
    callback(command);
  });
};

exports.create = create;
exports.addCommands = addCommands
exports.findAll = findAll;
exports.findOne = findOne;




