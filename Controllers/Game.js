var GameModel = require("../models/Game");

var GetTopNewGames=(req,res,next)=>{
    var query ={};
    
    query.type=req.query.type||1;
    var page =req.query.page||1;
    var pagesize=req.query.rows||10;
    GameModel.getTops(query,page,pagesize).then(
        result=>{
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
    );
}
//获取游戏列表
const GetGamelist=(req,res,next)=>{
    var query ={};
    
    query.type=req.query.type||1;
    var page =req.query.page||1;
    var pagesize=req.query.rows||10;
    GameModel.gamelist(query,page,pagesize).then(
        result=>{
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
    );
    
}
var gamedetail = (req,res,next)=>{
    var query ={};
    query.Id=req.query.id||1;
   
    GameModel.getdetail(query).then(
        result=>{
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
    )
   
}
var paybill=(req,res,next)=>{
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