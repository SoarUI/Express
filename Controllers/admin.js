var {baseImgUrl} =require("../untils/Config");
var UserModel = require("../models/users");
var fs =require('fs');
var multer = require('multer');
var uri =require('url');
var path = require('path');
//接口
var index=async (req,res,next)=>{
res.send({
    msg:'管理员页面',
    status:0
});
}
const getuserlist = async(req,res,next)=>{
    let result= await UserModel.userlist();
    if(result){
        res.send({
            msg:'获取用户列表成功',
            status:0,
            data:{
                userlist:result
            }
        });
    }else{
        res.send({
            msg:'获取用户列表失败',
            status:-1,
        });
    }
}
const freeze = async (req,res,next)=>{
    let result = UserModel.freeze(req.body.email,req.body.isfreeze);
    if(result){
        res.send({
            msg:'冻结操作成功',
            status:0
        });
    }else{
        res.send({
            msg:'冻结操作失败',
            status:-1,
        });
    }
}
const upload= async (req,res,next)=>{
    /*
    名字：originalname
    destination:public/uploads/

     */
    console.log(req.file);
    let extype =req.file.mimetype.split('/')[1];
    let fname=req.file.filename;//获取上传文件的名字
    let oname=req.file.originalname;//获取上传文件的原始名字
    let filereadstream =fs.createReadStream(req.file.path);
    let filewritestream =fs.createWriteStream(uri.resolve(req.file.destination,req.session.username+'.'+extype));
    
    filewritestream.on('finish',()=>{
        fs.unlink(req.file.path,function(error){
            if(error){
                console.log(error);
                return false;
            }
        })
        //---更新到数据库
        UserModel.updateIcon(req.session.username,uri.resolve(baseImgUrl, req.session.username+'.'+extype).replace('\\\\','//'));
        res.send({
            msg:'文件上传成功',
            status:0,
            icon:uri.resolve(baseImgUrl, req.session.username+'.'+extype).replace('\\\\','//')
        });
    });
    
    filereadstream.on('error',(error) => {
        console.log(error);
        res.send({
            msg:'文件上传失败',
            status:0
        });
    });
    filewritestream.on('error',(error) => {
        console.log(error)
        res.send({
            msg:'文件上传失败',
            status:0
        });
    })
    //
    filereadstream.pipe(filewritestream);
    
}
  module.exports={
      index,
      getuserlist,
      freeze,
      upload
  };
