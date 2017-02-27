module.exports = function(sequelize, Sequelize) {

  var Intents = sequelize.define('intents', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    intent: {
      type: Sequelize.STRING
    }
  });

  return Intents;
};