module.exports = function(sequelize, Sequelize) {

  var UserApps = sequelize.define('user_apps', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    }
  });

  return UserApps;
};