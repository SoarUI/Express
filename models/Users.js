var mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
var uri =require('url');
var UserSchema = new mongoose.Schema({
    username:{type:String,required:true,index:{unique:true}},
    password:{type:String,required:true},
    email:{type:String,required:true,index:{unique:true}},
    date:{type:Date,default:Date.now()},
    isadmin:{type:Boolean, default:false},
    isfreeze:{type:Boolean, default:false},
    icon:{type:String,default:"http://localhost:3000/uploads/08.jpg"}
});
//先删除model()//OverwriteModelError: Cannot overwrite `user` model once compiled.
//delete mongoose.connection.models['user'];
var UserModel;
if (mongoose.connection.models['user']) {
  UserModel = mongoose.connection.models['user'];
} else {
  UserModel = mongoose.model('user', UserSchema );
  UserModel.createIndexes();
}
//保存数据接口
const save =async (data)=>{
    var user= new UserModel(data);
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
//接口--查找用户
const findlogin=async (data)=>{
    return UserModel.findOne(data);
}
//接口-更新用户信息
const UpdatePassword= async (email,password)=>{
    return UserModel.update({email},{$set:{password}})
}
//获取用户列表
const userlist =async()=>{
    return await UserModel.find();
}
//冻结操作
const freeze =async (email,isfree)=>{
    return UserModel.update({email},{$set:{isfreeze:isfree}});
}
//更新图像
const updateIcon =async (username,icon)=>{
    return UserModel.update({username},{$set:{icon}});
}
/*******************************
 * 页面接口
 */

module.exports={
    save,
    findlogin,
    UpdatePassword,
    userlist,
    freeze,
    updateIcon
}