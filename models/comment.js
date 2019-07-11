var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var autoinc =require('./autoInc');
var CommentSchema = new mongoose.Schema({
    nickname:{type:String,required:true},//发表评论人
    userid:{type:String,required:true},//发表评论人ID
    commentId:{type:Number,required:true,index:{unique:true}},//评论ID
    ItemId:{type:Number,required:true},//评论内容ID
    time:{type:Date,default:Date.now()}, //发表时间
    type:{type:Number, default:1},
    status:{type:Number, default:1},//评论状态 -1=删除 1-正常
    commentTo:{type:String,default:''},//对某人的回复
    commentToId:{type:Number,default:0},//某人ID
    content:{type:String,default:''},//评论内容
    commentParentId:{type:Number,default:0}//评论内容ID的父ID
});
var CommentModel;
const checkIndex =async()=>{
    //查询是否已经有该键
    var res= await autoinc.findone({"_tid":'commentautoid'});
    console.log(res);
    if(res){
        console.log('found comment data had been created!');
    }
    else{
        console.log('create commentid!');
            autoinc.insertseq({
                _tid:'commentautoid'
            })
            
        }
}
if (mongoose.connection.models['comment']) {
  CommentModel = mongoose.connection.models['comment'];
} 
else {
        CommentModel = mongoose.model('comment', CommentSchema );
        CommentModel.createIndexes();
       checkIndex()
}

//获取某商品(对象相关的评论)
const getcomments =async (query,page,pagesize)=>{
     //先获取包含子项的所有项
     let result=  await CommentModel.find(
        query );//.limit(pagesize).skip((page - 1) * pagesize);
    let firstcomm =result.filter(x=>x.commentParentId==0);
    let subcomments =result.filter(x=>x.commentParentId!=0);
   let  restt =[];
   firstcomm.forEach(element => {
       let tmp ={commentId:element.commentId,time:element.time,content:element.content,
        nickname:element.nickname,commentTo:element.commentTo,commentParentId:element.commentParentId};
        tmp.subCommentList =subcomments.filter(x=>x.commentParentId==element.commentId);
        restt.push(tmp);
   });
   let startindex=(page - 1) * pagesize;
   let pagecount=(restt.length+1)/pagesize;
   //取N个数返回
   let ss =restt.filter((x,index)=>(index>=startindex && index<startindex+Number(pagesize)) );
   console.log(ss)
   let retR ={
            CommentList:ss,
            pagecount:pagecount
            }
    return retR;
}
//获取某评论的所有回复
const getsubcomments =async (query,page,pagesize)=>{
    //先获取包含子项的所有项
    let result=  await CommentModel.find(
        query );//.limit(pagesize).skip((page - 1) * pagesize);
    let firstcomm =result.filter(x=>x.commentParentId==0).limit(pagesize).skip((page - 1) * pagesize);;
    let subcomments =result.filter(x=>x.commentParentId!=0).limit(pagesize).skip((page - 1) * pagesize);
   let  restt =[];
   firstcomm.array.forEach(element => {
       let tmp ={commentId:element.commentId,time:element.time,content:element.content,
        nickname:element.nickname,commentTo:element.commentTo};
        tmp.subCommentList =subcomments.filter(x=>x.commentParentId==element.commentId);
        restt.push(tmp);
   });
    return restt;
}
const postcomment =async (data)=>{
    const stragiesinc = await autoinc.getNextSeq('commentautoid');
    data.commentId=Number(stragiesinc);
    var user= new CommentModel(data);
   const result= await Promise.all(
      [
        user.save()
      ]
    );
    if(result[0]){
      return true;
    }
    else{
      return false;
    }

}
module.exports ={
    getcomments,
    getsubcomments,
    postcomment
}