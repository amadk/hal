var Intent = require('../../models/index.js').Intent;
var appController = require('./apps.js');

var create = function(props, callback) {
  Intent.build(props)
  .save()
  .then(function(intent) {
    callback(intent);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(callback) {
  Intent.findAll().then(function(intents) {
    callback(intents);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(intentObj, callback) {
  Intent.findOne(intentObj).done(function(intent) {
    callback(intent);
  });
};

exports.create = create;
// exports.addIntents = addIntents
exports.findAll = findAll;
exports.findOne = findOne;
