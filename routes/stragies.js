var express = require('express');
var strageController=require('../Controllers/stragies.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//接口
//
router.get('/GetTopStragies',strageController.GetTopStragies)
router.get('/stragiesdetail',strageController.stragiesdetail)
router.get('/getmyarticle',strageController.getmyarticle)
router.post('/postarticle',strageController.savearticle)
module.exports = router;
