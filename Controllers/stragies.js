var StragiesModel = require("../models/stragies");

const GetTopStragies= (req,res,next)=>{
    var query ={};
    
    query.type=req.query.type||1;
    var page =req.query.page||1;
    var pagesize=req.query.rows||10;
    StragiesModel.getTops(query,page,pagesize).then(
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
const stragiesdetail = (req,res,next)=>{
    var query ={};
    query.Id=req.query.id||1;
    StragiesModel.stragiesdetail(query).then(
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
const getmyarticle= (req,res,next)=>{
    let query ={author:''};
    
    query.author=req.session.username;
    let page =req.query.page||1;
    let pagesize=req.query.rows||10;
    StragiesModel.getmyarticle(query,page,pagesize).then(
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
const  savearticle=(req,res,next)=>{
    let data ={};
    data.Title=req.body.title;
    data.content=req.body.content;
    data.eTitle =req.body.title;
    data.author =req.session.username;
    StragiesModel.postarticle (data).then(
        result=>{
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
    )
    
  }
module.exports={
    GetTopStragies,
    stragiesdetail,
    getmyarticle,
    savearticle
}