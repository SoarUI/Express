var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var autoinc =require('./autoInc');
var StragiesSchema = new mongoose.Schema({
    Title:{type:String,required:true},
    eTitle:{type:String,required:true},
    Id:{type:Number,required:true},
    date:{type:Date,default:Date.now()},
    type:{type:Number, default:1},
    star:{type:Number, default:3},
    coverimg:{type:String,default:"http://localhost:3000/uploads/08.jpg"},//封面
    targeturl:{type:String,default:""},//目标连接
    grade:{type:Number,default:9.0},  //观众评级
    author:{type:String,default:''},//作者
    referauthor:{type:String,default:''},//原作者
    content:{type:String,default:''},//内容
    lastedit:{type:Date,default:Date.now}
});
var StragiesModel;
const checkIndex =async()=>{
  let res= await autoinc.findone({"_tid":'stragiesautoid'});
   
      if(res){
        console.log('found data had been created!');
      }
      else{
          console.log('create stragiesid!');
              autoinc.insertseq({
                  _tid:'stragiesautoid'
              })
            
          }
}
if (mongoose.connection.models['stragies']) {
  StragiesModel = mongoose.connection.models['stragies'];
} else {
  StragiesModel = mongoose.model('stragies', StragiesSchema );
  StragiesModel.createIndexes();
  //查询是否已经有该键
  checkIndex();
  /**/
}
const save =async (data)=>{
    var user= new StragiesModel(data);
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
    return  await StragiesModel.find(
        query ).limit(pagesize).skip((page - 1) * pagesize);
    
}
const stragiesdetail=async (query)=>{
return await StragiesModel.findOne(query);
}
const getmyarticle=async (query,page,pagesize)=>{
  return  await StragiesModel.find(
      query ).limit(pagesize).skip((page - 1) * pagesize);
  
}
const postarticle =async (data)=>{
    const stragiesinc = await autoinc.getNextSeq('stragiesautoid');
    data.Id=Number(stragiesinc);
    var user= new StragiesModel(data);
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



//导出模型接口
module.exports ={
    getTops,
    stragiesdetail,
    getmyarticle,
    postarticle  
}