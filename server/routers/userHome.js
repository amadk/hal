var express = require('express');
var userController = require('../../db/controllers/users.js');

var router = express.Router();


app.get('/downloadedApps', function(req, res) {
  console.log('recieved!')
  appController.findAll({where: {}}, apps => {
    console.log(apps)
    res.send(apps);
  })
})


module.exports = router;