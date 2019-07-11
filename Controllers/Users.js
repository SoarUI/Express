var {Mailer} =require("../untils/Config");
var UserModel = require("../models/Users");
var login= (req,res,next)=>{
  var {username,password} =req.body;
  
  UserModel.findlogin({
    username,
    password
  }).then(result=>{
        //用户状态查询
      if(result.isfreeze){
        res.send({
          msg:'登录失败-用户已经冻结',
          status:-3
        })
        return;
      }
      if(result){
        //保存用户信息
        req.session.username=username;
        req.session.isadmin=result.isadmin;
        req.session.isfreeze=result.isfreeze;
        req.session.icon = result.icon;
        req.session.token='jhjagjdgajdgajkga==-kshkfh';
        res.send({
          msg:'登录成功',
          status:0,
          clientID:'jhjagjdgajdgajkga==-kshkfh',
          isadmin:result.isadmin,
          isfreeze:result.isfreeze
        })
      }else{
        res.send({
          msg:'登录失败',
          status:-1
        })
      }
  });
  
};
const register= (req,res,next)=>{
var {username,password,email,verify} =req.body;
if(email != req.session.email ||verify != req.session.verify){
  res.send({
    msg:"注册失败-验证码错误或邮箱不一致",
    status:-2
  });
}
//判断是否超时
if(Date.now()-req.session.time >3600000){
  res.send({
    msg:'已超时，请重新发送验证码',
    status:-1
  })
  return;
}
UserModel.save({
  username,
  password,
  email
}).then(result=>{
  if(result){
    res.send({
      msg:"注册成功",
      status:0
    });
  }else{
    res.send({
      msg:"注册失败",
      status:-1
    });
  }
});

};
const verify=(req,res,next)=>{
  var testAccount = req.body.email;
  var vericode =Mailer.verify;
  //通过sesion保存在后端，以便后续操作（redis）
  req.session.verify =vericode;
  req.session.email=testAccount;


  // create reusable transporter object using the default SMTP transport
  // send mail with defined transport object
   Mailer.transporter.sendMail({
    from: Mailer.config.auth.user, // sender address
    to: testAccount, // list of receivers
    subject: "用户注册验证码", // Subject line
    text: "你的注册码为："+vericode, // plain text body
    html: "<b>你的注册码为："+vericode +"</b>" // html body
  }).then( info=>{
    if(info){
      res.send({
          msg:'验证码发送成功！',
          status:0
      });
    }else{
      res.send({
          msg:'验证码发送失败！',
          status:-1
      });
    }
  }

  );
 
};
const getUsers= (req,res,next)=>{
  if(req.session.username){
    
    res.send({
      msg:'获取用户信息成功',
      status:0,
      data:{
        username:req.session.username,
        clientID:'jhjagjdgajdgajkga==-kshkfh',
      isadmin:req.session.isadmin,
      isfreeze:req.session.isfreeze,
      icon:req.session.icon
      }
    })
  }else{
    res.send({
      msg:'获取用户信息失败',
      status:-1
    })
  }
};
const logout= (req,res,next)=>{
  req.session.username='';
    res.send({
      msg:'登出成功',
      status:0
    })
};
const Updatepassword=(req,res,next)=>{
 var{email,password,verify} =req.body;
  if(email ===req.session.email && verify ===req.session.verify){
        UserModel.UpdatePassword(
          email,
          password
        ).then(
                result=>{
                  if(result){
                    res.send({
                      msg:'修改密码成功',
                      status:-1
                    })
                  }else{
                    res.send({
                      msg:'修改失败',
                      status:-1
                    })
                  }
                }
        );
   
  }else{
    res.send({
      msg:'验证码不一致',
      status:-1
    })
  }
};
module.exports={
    login,
    register,
    verify,
    logout,
    getUsers,
    Updatepassword
};