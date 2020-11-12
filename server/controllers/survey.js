let express = require('express');

let Survey = require('../models/survey');

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

module.exports.displayCreatePage = (req, res, next) => {
    res.render('create', {title: 'Create Survey'});
}

module.exports.processCreatePage = (req, res, next) => {
    
}

module.exports.displayEditPage = (req, res, next) => {
    
}

module.exports.processEditPage = (req, res, next) => {
    
}

module.exports.processDeletePage = (req, res, next) => {
    
}