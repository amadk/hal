var express = require('express');
var userController = require('../../db/controllers/users/users.js');

var router = express.Router();

router.route('/signIn')
  .post(function(req, res) {
    console.log('a request')
    const email = req.body.email;
    const password = req.body.password;
    const response = {};
    userController.findOne({where: {email: email}}, user => {
      if (!user) {
        response.authenticated = false;
      } else {
        userController.comparePassword(user.get('password'), password, match => {
          if (match) {
            response.authenticated = true;
            userController.createSession(req, res, user, function() {
            });
          } else {
            response.authenticated = false;
          }
        });
      }
      res.send(response);
    });
  });

router.route('/signUp')
  .post(function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    userController.findOne({where: {email: email}}, user => {
      if (!user) {
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash;
            req.body.salt = salt
            userController.create(req.body, user => {
              userController.createSession(req, res, user, {auth: true});
            });
          });
        });
      } else {  //if user exists
        res.send('User exists');
      }
    });
  });

router.route('/checkAuth')
  .get((req, res) => {
    res.send({authenticated: !!req.session});
  });

router.route('/signOut')
  .get((req, res) => {
    req.session.destroy(() => {
      res.send('session destroyed');
    });
  });

module.exports = router;

