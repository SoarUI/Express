var express = require('express');
var gameController=require('../Controllers/comment.js');
var router = express.Router();
//登录用户才有权发表评论拦截
router.use((req,res,next)=>{
    if(req.session.username )
    {
      next();
    }
    else{
      res.send({
        msg:'没有权限请登录后，再试',
        status:-1
      })
    }
  })
router.get('/getsubcomment',gameController.getsubcomment)
router.get('/getcomments',gameController.getComments)
router.post('/postcomment',gameController.savecomment)

module.exports = router;