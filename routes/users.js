var express = require('express');
var usersController=require('../Controllers/Users.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//接口
router.post('/login',usersController.login);
router.post('/register',usersController.register);
router.post('/verify',usersController.verify);
router.post('/logout',usersController.logout);
router.get('/getUsers',usersController.getUsers);
router.post('/UpdatePassword',usersController.Updatepassword);



module.exports = router;
