let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let surveylist = require('../models/surveylist');

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/products', indexController.displayProductsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

/**GET SURVEYS PAGE ---------------------------- */
router.get('/Surveys', function(req, res, next) {

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





module.exports = router;