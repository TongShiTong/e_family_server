var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入连接数据库
const mongooseConnect = require('./model/config')
//引入session
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

var indexRouter = require('./routes/index');

var app = express();
//全局注册session
app.use(session({
    secret: 'tong',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false,maxAge:1000*60*60*2 },
//    做session持久化,安装connect-mongo,本来存内存，把他存在数据库里
    store: new MongoStore({mongooseConnection: mongooseConnect})
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
