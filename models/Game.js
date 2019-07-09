var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var autoinc =require('./autoInc');
var GameSchema = new mongoose.Schema({
    name:{type:String,required:true},
    ename:{type:String,required:true},
    Id:{type:Number,required:true},
    date:{type:Date,default:Date.now()},
    type:{type:Number, default:1},
    star:{type:Number, default:3},
    coverimg:{type:String,default:"http://localhost:3000/uploads/08.jpg"},//封面
    targeturl:{type:String,default:""},//目标连接
    grade:{type:Number,default:9.0},  //观众评级
    author:{type:String,default:''},//制造商
    ISP:{type:String,default:''},//运维商
    releasedate:{type:Date,default:Date.now()},
    description:{type:String,default:'目前还没有描述'}//详细描述
    
});
var GameModel;
if (mongoose.connection.models['game']) {
  GameModel = mongoose.connection.models['game'];
} else {
  GameModel = mongoose.model('game', GameSchema );
  GameModel.createIndexes();
  //查询是否已经有该键
  let res= autoinc.findone({"_tid":'gameautoid'})
    if(res){
      ;
      }else{
            autoinc.insertseq({
                _tid:'gameautoid'
            })
           
          }
 
  /**/
}
const save =async (data)=>{
    var user= new GameModel(data);
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
//数据库接口
const getTops=async (query,page,pagesize)=>{
    return  await GameModel.find(
        query ).limit(pagesize).skip((page - 1) * pagesize);
    
}
//分页获取游戏列表
const gamelist=async (query,page,pagesize)=>{
  return  await GameModel.find(
    query ).limit(pagesize).skip((page - 1) * pagesize);
}
const getdetail=async (query)=>{
  return await GameModel.findOne(query);
  }
  



//导出模型接口
module.exports ={
    getTops,
    save,
    getdetail,
    gamelist
}