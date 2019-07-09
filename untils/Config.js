var mongoose =require('mongoose');
var nodemailer=require('nodemailer');
var Mongoose={
    url:'mongodb://localhost:27017/datadb',
    Connect(){
        var options={useNewUrlParser:true/*,useCreateIndex: true*/};
        mongoose.connect(this.url,options,(err)=>{
            if(err){
                console.log('数据库连接失败');
                return;
            }
            console.log("数据库连接成功！");
        });
    }
}

const Mailer ={
    config:{
        host:'smtp.126.com',
        port:25,
        auth:{
            user:'lixingshunnick@126.com',
            pass:'ehaiker126'
        }
    },
    get transporter(){
        return nodemailer.createTransport(this.config);
    },
    get verify(){
        return Math.random().toString().substring(2,6);
    }
}
const baseImgUrl='http://localhost:3000/uploads//'
//
module.exports ={
    Mongoose,
    Mailer,
    baseImgUrl
};