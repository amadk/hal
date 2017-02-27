module.exports = function(sequelize, Sequelize) {

  var Commands = sequelize.define('commands', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    command: {
      type: Sequelize.STRING
    },
    sampleCommand: {
      type: Sequelize.STRING
    }
  });

  return Commands;
};