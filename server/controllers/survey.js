let express = require('express');

let Survey = require('../models/survey');

module.exports.displaySurveysPage = (req, res, next) => {
    
    Survey.find((err, data) => {
        if(err)
        {
            console.error(err);
            res.end();
        }
        res.render('surveys', {title: 'Surveys', surveys: data});
    });  
}

module.exports.displayCreatePage = (req, res, next) => {
    res.render('create-edit', {title: 'Create Survey', surveys: '', buttonName: 'Create'});
}

module.exports.processCreatePage = (req, res, next) => {
    Survey.create({
        "title": req.body.surveyTitle,
        "q1":req.body.question1,
        "q1o1":req.body.q1choice1,
        "q2":req.body.question2,
        "q3":req.body.question3,
        "q4":req.body.question4,
        "q5":req.body.question5  
    },
    (err, survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/surveys');
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
          console.log(err);
          res.end();
        }
        res.render('create-edit', {title:'Edit Survey', surveys:surveyToEdit, buttonName: 'Edit'})
      });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.updateOne(
      {_id:id}, 
      {
        "_id": id,
        "title": req.body.surveyTitle,
        "q1":req.body.question1,
        "q2":req.body.question2,
        "q3":req.body.question3,
        "q4":req.body.question4,
        "q5":req.body.question5
      },
      (err) =>
      {
        console.log(err);
        res.end();
      });
      res.redirect('/surveys');
}

module.exports.processDeletePage = (req, res, next) => {
    let id = req.params.id;
    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/surveys');
    });
}

module.exports.displayParticipatePage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
          console.log(err);
          res.end();
        }
        res.render('participate', {title:'Participate', surveys:surveyToEdit})
      });
}

module.exports.processParticapatePage = (req, res, next) => {
    res.redirect('/home');
}
