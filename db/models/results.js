module.exports = function(sequelize, Sequelize) {

  var Result = sequelize.define('results', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    displayUrl: {
      type: Sequelize.TEXT
    },
    snippet: {
      type: Sequelize.TEXT
    }
  });

  return Result;
};