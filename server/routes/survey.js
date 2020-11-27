let express = require('express');
let router = express.Router();
let passport = require('passport');

let surveyController = require('../controllers/survey');

// helper function for authentication guard
function requireAuth(req, res, next) {

  // First check if the user is logged in
  if (!req.isAuthenticated())
  {
    return res.redirect('/login');
    }
    next();
 }

/* GET Surveys page. READ*/
router.get('/', surveyController.displaySurveysPage);

/* GET Create MCQ Surveys page. CREATE*/
router.get('/create-mcq', surveyController.displayCreatePage);

/* POST process MCQ Surveys Create page. CREATE*/
router.post('/create-mcq', surveyController.processCreatePage);

/* GET Create Short Answer Surveys page. CREATE*/
router.get('/create-sa', requireAuth, surveyController.displayCreateShortPage);

/* POST process Short Answer Surveys Create page. CREATE*/
router.post('/create-sa', requireAuth, surveyController.processCreateShortPage);

/* GET Create True or False Surveys page. CREATE*/
router.get('/create-tof', requireAuth, surveyController.displayCreateTruePage);

/* POST process True or False Surveys Create page. CREATE*/
router.post('/create-tof', requireAuth, surveyController.processCreateTruePage);

/* GET Edit page. UPDATE*/
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);

/* POST process Edit page. UPDATE*/
router.post('/edit/:id', requireAuth, surveyController.processEditPage);

/* GET process Delete page. DELETE*/
router.get('/delete/:id', requireAuth, surveyController.processDeletePage);

/* GET Participate page. READ*/
router.get('/participate/:id', surveyController.displayParticipatePage);

/* Post process Participate page. READ*/
router.post('/participate/:id', surveyController.processParticipatePage);

module.exports = router;
