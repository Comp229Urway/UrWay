// installed 3rd party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Create the modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

// Create the authentication objects
let localStrategy = passportLocal.Strategy; // alias
let userModel = require('../models/user');
let User = userModel.User; // alias

// Create module for auth messaging and error management
let flash = require('connect-flash');

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let surveyRouter = require('../routes/survey');

let app = express();

// database setup
let mongoose = require('mongoose');
let DB = require('./db');

// point mongoose to the DB URI
mongoose.connect(DB.URI, {useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express  -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Setup express session
let Auth = require('./auth');
app.use(session({
  secret: Auth.Secret,
  saveUninitialized: false,
  resave: false
}));

// Initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Implement an user authentication Strategy
passport.use(User.createStrategy());

// serialize and deserialize the user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/survey', surveyRouter)
app.use('/users', usersRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error'});
});

module.exports = app;
