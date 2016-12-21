module.exports = function(sequelize, Sequelize) {

  var App = sequelize.define('apps', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    version: {
      type: Sequelize.STRING
    },
    version_name: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.INTEGER
    },
    htmlLink: {
      type: Sequelize.STRING
    },
    iconLink: {
      type: Sequelize.STRING
    }
  });

  return App;
};