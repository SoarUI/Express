var express = require('express');
var gameController=require('../Controllers/Game.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//接口
//
router.get('/GetTopNewGames',gameController.GetTopNewGames)
router.get('/gamedetail',gameController.gamedetail)
router.get('/GetGamelist',gameController.GetGamelist)
router.post('/paybill',gameController.paybill)

module.exports = router;
