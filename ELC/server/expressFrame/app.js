var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const morgan = require('morgan')
const logger = require('./logger')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//错误处理

const _errorHandler = (err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl}` +err.message)
  const errorMsg = err.message;
  res.status(err.status || 500).json({
    code:-1,
    success: false,
    message: errorMsg,
    data:{}
  })
}
app.use(_errorHandler);

module.exports = app;
