let express = require('express');
let router = express.Router();

// Create the modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');


let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

/* GET Display Login page. */
router.get('/login', indexController.DisplayLoginPage);

/* PROCESS Login page. */
router.post('/login', indexController.ProcessLoginPage);

/* GET Display Register page. */
router.get('/register', indexController.DisplayRegisterPage);

/* PROCESS Register page. */
router.post('/register', indexController.ProcessRegisterPage);

/* GET Perform Logout page. */
router.get('/logout', indexController.PerformLogout);

module.exports = router;
