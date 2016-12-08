var Query = require('../models/index.js').Query;

var create = function(props, callback) {
  Query.build(props)
  .save()
  .then(function(query) {
    callback(query);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(callback) {
  Query.findAll().then(function(queries) {
    callback(queries);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(queryObj, callback) {
  Query.findOne(queryObj).done(function(query) {
    console.log('🍊  Found one Query in db:', query);
    callback(query);
  });
};

exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;