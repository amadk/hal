module.exports = function(sequelize, Sequelize) {

  var Query = sequelize.define('queries', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    query: {
      type: Sequelize.TEXT
    }
  });

  return Query;
};