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
const App = require('./apps.js')(sequelize, Sequelize);
const UserApps = require('./userApps.js')(sequelize, Sequelize);


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
App.belongsToMany(User, {
  through: 'user_apps',
  foreignKey: 'app_id'
});

User.belongsToMany(App, {
  through: 'user_apps',
  foreignKey: 'user_id'
});

// Devloper-App relationship:
User.hasMany(App, {
  foreignKey: 'developer_id'
});

App.belongsTo(User, {
  foreignKey: 'developer_id'
});

//Create missing tables, if any
// sequelize.sync({force: true});
sequelize.sync();


exports.Query = Query;
exports.Result = Result;
exports.QueryResults = QueryResults;
exports.User = User;
exports.App = App;
exports.UserApps = UserApps;

