let express = require('express');
let router = express.Router();

let Survey = require('../models/survey');

module.exports.displayHomePage = (req, res, next) => {
    res.render('home', {title: 'Home'});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', { title: 'About'});
}

module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'Products'});
}

module.exports.displaySurveysPage = (req, res, next) => {
    
    Survey.find((err, data) => {
        if(err)
        {
            console.error(err);
            res.end();
        }
        console.log(data);
        res.render('surveys', {title: 'Surveys', surveys: data});
    });  
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', { title: 'Contact'});
}