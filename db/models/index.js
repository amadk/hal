// This file makes all join table relationships
const Sequelize = require('sequelize');

var db = process.env.db; //iSearch
var dbUser = process.env.dbUser; //
var dbPassword = process.env.dbPassword;
var dbHost = process.env.dbHost;

const sequelize = new Sequelize(db, dbUser, dbPassword, {
  dialect: 'mysql',
  host: dbHost
});

// Any variable that starts with a capital letter is a model
const Query = require('./search/queries.js')(sequelize, Sequelize);
const Result = require('./search/results.js')(sequelize, Sequelize);
const QueryResults = require('./search/queryResults')(sequelize, Sequelize);

const User = require('./users/users.js')(sequelize, Sequelize);

const App = require('./command/apps.js')(sequelize, Sequelize);
const UserApps = require('./command/userApps.js')(sequelize, Sequelize);
const Command = require('./command/commands.js')(sequelize, Sequelize);
const Intent = require('./command/intents.js')(sequelize, Sequelize);




// QueryResults join table:
Result.belongsToMany(Query, {
  through: 'query_results',
  foreignKey: 'result_id'
});

Query.belongsToMany(Result, {
  through: 'query_results',
  foreignKey: 'query_id'
});


// UserApps join table:
User.belongsToMany(App, {
  through: 'user_apps',
  foreignKey: 'user_id'
});

App.belongsToMany(User, {
  through: 'user_apps',
  foreignKey: 'app_id'
});

// Devloper-App relationship:
User.hasMany(App, {
  foreignKey: 'developer_id'
});

App.belongsTo(User, {
  foreignKey: 'developer_id'
});

// App-Intent relationship:
App.hasMany(Intent, {
  foreignKey: 'app_id'
});

Intent.belongsTo(App, {
  foreignKey: 'app_id'
});

// Intent-Command relationship:
Intent.hasMany(Command, {
  foreignKey: 'intent_id'
});

Command.belongsTo(Intent, {
  foreignKey: 'intent_id'
});



//Create missing tables, if any
// sequelize.sync({force: true});
sequelize.sync();

exports.User = User;
exports.App = App;
exports.UserApps = UserApps;
exports.Intent = Intent;
exports.Command = Command

exports.Query = Query;
exports.Result = Result;
exports.QueryResults = QueryResults;

