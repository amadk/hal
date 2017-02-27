module.exports = function(sequelize, Sequelize) {

  var QueryResults = sequelize.define('query_results', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    }
  });

  return QueryResults;
};