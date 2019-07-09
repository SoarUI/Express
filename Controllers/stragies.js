var StragiesModel = require("../models/stragies");

var GetTopStragies=async (req,res,next)=>{
    var query ={};
    
    query.type=req.query.type||1;
    var page =req.query.page||1;
    var pagesize=req.query.rows||10;
    var result=await StragiesModel.getTops(query,page,pagesize);
    if(result){
        res.send({
            msg:'查询成功',
            data:result,
            status:0
        })
    }
    else{
        res.send({
            msg:'查询失败',
            data:result,
            status:-1
        })
    }
    console.log('----api return-----')
}
var stragiesdetail =async (req,res,next)=>{
    var query ={};
    query.Id=req.query.id||1;
    var result=await StragiesModel.stragiesdetail(query);
    if(result){
        res.send({
            msg:'查询成功',
            data:result,
            status:0
        })
    }
    else{
        res.send({
            msg:'查询失败',
            data:result,
            status:-1
        })
    }
}
var getmyarticle=async (req,res,next)=>{
    let query ={author:''};
    
    query.author=req.session.username;
    let page =req.query.page||1;
    let pagesize=req.query.rows||10;
    let result=await StragiesModel.getmyarticle(query,page,pagesize);
    if(result){
        res.send({
            msg:'查询成功',
            data:result,
            status:0
        })
    }
    else{
        res.send({
            msg:'查询失败',
            data:result,
            status:-1
        })
    }
}
var  savearticle=async (req,res,next)=>{
    let data ={};
    data.Title=req.body.title;
    data.content=req.body.content;
    data.eTitle =req.body.title;
    data.author =req.session.username;
    let result=await StragiesModel.postarticle (data);
    if(result){
        res.send({
            msg:'提交成功',
            data:result,
            status:0
        })
    }
    else{
        res.send({
            msg:'提交失败',
            data:result,
            status:-1
        })
    }
  }
module.exports={
    GetTopStragies,
    stragiesdetail,
    getmyarticle,
    savearticle
}