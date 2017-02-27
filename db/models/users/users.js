module.exports = function(sequelize, Sequelize) {

  var User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    salt: {
      type: Sequelize.STRING
    },
    profilePic: {
      type: Sequelize.TEXT
    },
    backgroundImg: {
      type: Sequelize.TEXT
    }
  });

  return User;
};