
const CommentModel = require("../models/comment");


const getsubcomment = (req,res,next)=>{
    var query ={};
    query.commentParentId=req.query.commentId;
    //组合条件ID相同，parentID==commentid
    let page =req.query.page||1;
    let pagesize=req.query.rows||10;
    CommentModel.getsubcomments(query,page,pagesize).then(
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
const getComments= (req,res,next)=>{
    let query ={ItemId:''};
    
    query.ItemId=req.query.itemId;
    let page =req.query.page||1;
    let pagesize=req.query.rows||20;
    CommentModel.getcomments(query,page,pagesize).then(
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
const  savecomment=(req,res,next)=>{
    let data ={};
    data.userid =req.session.userid;
    data.nickname=req.session.username;
    data.content=req.body.content;
    data.ItemId =req.body.ItemId;
    data.commentTo =req.body.commentTo;
    data.commentParentId =req.body.commentParentId||0;
    CommentModel.postcomment (data).then(
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
module.exports ={
    getComments,
    getsubcomment,
    savecomment
}