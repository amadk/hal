// This file makes all join table relationships
const Sequelize = require('sequelize');

var db = process.env.db;
var dbUser = process.env.dbUser;
var dbPassword = process.env.dbPassword;
var dbHost = process.env.dbHost;

const sequelize = new Sequelize(db, dbUser, dbPassword, {
  dialect: 'mariadb',
  host: dbHost
});

// Any variable that starts with a capital letter is a model
const Query = require('./queries.js')(sequelize, Sequelize);
const Result = require('./results.js')(sequelize, Sequelize);
const QueryResults = require('./queryResults')(sequelize, Sequelize);
const User = require('./users.js')(sequelize, Sequelize);

// BookmarkUsers join table:
Result.belongsToMany(Query, {
  through: 'query_results',
  foreignKey: 'result_id'
});

Query.belongsToMany(Result, {
  through: 'query_results',
  foreignKey: 'query_id'
});

//Create missing tables, if any
// sequelize.sync({force: true});
sequelize.sync();


exports.Query = Query;
exports.Result = Result;
exports.QueryResults = QueryResults;
exports.User = User;
