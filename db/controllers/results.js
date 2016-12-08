var Result = require('../models/index.js').Result;

var create = function(props, callback) {
  Result.build(props)
  .save()
  .then(function(result) {
    callback(result);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(callback) {
  Result.findAll().then(function(results) {
    callback(results);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(queryObj, callback) {
  Result.findOne(queryObj).done(function(result) {
    console.log('🍊  Found one Result in db:', result);
    callback(result);
  });
};

exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;