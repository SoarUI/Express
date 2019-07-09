var GameModel = require("../models/Game");

var GetTopNewGames=async (req,res,next)=>{
    var query ={};
    console.log(req.query.type)
    query.type=req.query.type||1;
    var page =req.query.page||1;
    var pagesize=req.query.rows||10;
    var result=await GameModel.getTops(query,page,pagesize);
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
//获取游戏列表
var GetGamelist=async (req,res,next)=>{
    var query ={};
    console.log(req.query.type)
    query.type=req.query.type||1;
    var page =req.query.page||1;
    var pagesize=req.query.rows||10;
    var result=await GameModel.gamelist(query,page,pagesize);
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
var gamedetail =async (req,res,next)=>{
    var query ={};
    query.Id=req.query.id||1;
   
    var result=await GameModel.getdetail(query);
   
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
var paybill=async (req,res,next)=>{
    res.send({
        msg:'充值成功',
        status:0
    })
}
module.exports={
    GetTopNewGames,
    gamedetail,
    GetGamelist,
    paybill
}