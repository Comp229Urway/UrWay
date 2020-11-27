let express = require('express');
let router = express.Router();

// Create the modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');

let indexController = require('../controllers/index');
let surveyController = require('../controllers/survey');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

/* GET Route for displaying the Login Page*/
router.get('/login', indexController.DisplayLoginPage);

/* POST Route for displaying the Login Page*/
router.post('/login', indexController.ProcessLoginPage);

/* GET Display Register page. */
router.get('/register', indexController.DisplayRegisterPage);

/* PROCESS Register page. */
router.post('/register', indexController.ProcessRegisterPage);

/* GET Perform Logout page. */
router.get('/logout', indexController.PerformLogout);

/* GET Participate page. READ*/
router.get('/participate/:id', surveyController.displayParticipatePage);

/* Post process Participate page. READ*/
router.post('/participate/:id', surveyController.processParticipatePage);

module.exports = router;
