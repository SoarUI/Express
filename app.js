var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var {Mongoose,Emailer} =require("./untils/Config");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var AdminRouter = require('./routes/admin');
var gameRouter =require('./routes/game')
var stragiesRouter=require('./routes/stragies')
var session = require('express-session')
//var bodyParser = require('body-parser');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//body为空解决：
 
//app.use(bodyParser());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//session插件
app.use(session({
  secret: 'ehaikerv2 keyID',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false,
    maxAge: 60000*60 },
  name:'SessionId'
}));
//连接数据库
Mongoose.Connect();
//路由接口--需要放在session中间件的下方
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
//管理接口
app.use('/api/admin',AdminRouter);
//游戏查询
app.use('/api/game',gameRouter);
//攻略查询
app.use('/api/stragies',stragiesRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
