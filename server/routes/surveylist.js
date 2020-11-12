let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let surveylist = require('../models/surveylist');

/**GET SURVEYS.ejs PAGE ----------------------------*/
router.get('/', function(req, res, next) {

    surveylist.Model.find((err, data) => {
        if (err) {
            console.error(err);
            res.end();
        }

        //console.table(data, ['_id', 'surveyname', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6']);
        //console.table(data);
        console.log(data);

        res.render('Surveys', { title: 'Surveys', surveylist: data });
    })

});

/* GET Surveylisting page. */
//router.get('/surveylisting', indexController.displayContactPage);// Projects Page
router.get('/surveylisting', function(req, res, next) {
    res.render('surveylisting', { title: 'Survey' });
});

/* add page*/
router.get('/add', (req, res, next) => {
    res.render('surveylist', { title: 'Create Survey' });
});
/* GET Create page. CREATE*/


/**Get process page */
router.post('/add', (req, res, next) => {

});

/**Edit Update*/
router.get('/edit/:id', (req, res, next) => {

});

/**Post Update*/
router.post('/edit/:id', (req, res, next) => {

});
/**Delete */
router.get('/deleted/:id', (req, res, next) => {

});

module.exports = router;