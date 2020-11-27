let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create the User Model Instance
let userModel = require('../models/user');
let User = userModel.User; 

let Survey = require('../models/survey');

module.exports.displayHomePage = (req, res, next) => {
    //res.render('home', {title: 'Home'});
    Survey.find((err, data) => {
        if(err)
        {
            console.error(err);
            res.end();
        }
        res.render('index', {title: 'Home', surveys: data,
  displayName: req.user ? req.user.displayName : '' });
    });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About',
  displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact',
  displayName: req.user ? req.user.displayName : '' });
}

module.exports.DisplayLoginPage = (req, res, next) => {
  // check if the user is already logged in
    if(!req.user){
      res.render('auth/login', 
      {
        title: 'Login',
        messages: req.flash('loginMessage'),
        displayName: req.user ? req.user.displayName : ''
      });
    }
    return res.redirect('/');
  }

module.exports.ProcessLoginPage = (req, res, next) => 
  {
    passport.authenticate('local', 
    (err, user, info) => {
      // server error?
      if(err)
      {
        return next(err);
      }

      // is there login errors?
      if(!user)
      {
        req.flash('loginMessage', 'Authentication Error');
        return res.redirect('/login');
      }

      req.login(user, (err) => {
        // db server error?
        if(err)
        {
          return next(err);
        }

        return res.redirect('/home');
      });

    })(req, res, next);
}

module.exports.DisplayRegisterPage = (req, res, next) => {
    // check if the user is already logged in
    if(!req.user)
    {
      res.render('auth/register', 
      {
        title: 'Register',
        messages: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName : ''
      });
    }
    return res.redirect('/');
  }

module.exports.ProcessRegisterPage = (req, res, next) => {
    // Instantiate a new user object
    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if (err) {
            console.log('Error: Inserting New User');
            if (err.name == "UserExistsError") {
                req.flash('registerMessage', 'Registration Error');
                console.log('Error: User Already Exists');
            }
            return res.render('auth/register',
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
        }
        else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('../home');
            });
        }
    });
  }

module.exports.PerformLogout = (req, res, next) => {
  req.logout();
  res.redirect('/');
  }