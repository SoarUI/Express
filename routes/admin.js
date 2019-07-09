var express = require('express');
var adminController=require('../Controllers/admin.js');
var router = express.Router();
var multer = require('multer');
var upload =multer({dest:'public/uploads/'});
/*管理页面 */
//权限拦截
router.use((req,res,next)=>{
  if(req.session.username && req.session.isadmin)
  {
    next();
  }
  else{
    res.send({
      msg:'没有管理权限',
      status:-1
    })
  }
})
router.get('/', adminController.index);
router.post('/getuserlist',adminController.getuserlist);
router.post('/freeze',adminController.freeze);
router.post('/upload',upload.single('file'),adminController.upload);
//接口
module.exports = router;
