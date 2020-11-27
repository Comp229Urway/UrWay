let express = require('express');

let Survey = require('../models/survey');

let SurveyShort = require('../models/survey');

let SurveyTrue = require('../models/survey');

module.exports.displaySurveysPage = (req, res, next) => {

    Survey.find((err, data) => {
        if (err) {
            console.error(err);
            res.end();
        }
        res.render('surveys', { title: 'Surveys', surveys: data });
    });
}

// MCQ SURVEY Create and Read
module.exports.displayCreatePage = (req, res, next) => {
    res.render('create-edit', { title: 'Create Multiple Choices Questions Survey', surveys: '', buttonName: 'Create' });
}

module.exports.processCreatePage = (req, res, next) => {

    Survey.create({
            "title": req.body.surveyTitle,
            "q1": req.body.question1,
            "q1o1": req.body.q1choice1,
            "q1o2": req.body.q1choice2,
            "q1o3": req.body.q1choice3,
            "q1o4": req.body.q1choice4,
            "q2": req.body.question2,
            "q2o1": req.body.q2choice1,
            "q2o2": req.body.q2choice2,
            "q2o3": req.body.q2choice3,
            "q2o4": req.body.q2choice4,
            "q3": req.body.question3,
            "q3o1": req.body.q3choice1,
            "q3o2": req.body.q3choice2,
            "q3o3": req.body.q3choice3,
            "q3o4": req.body.q3choice4,
            "q4": req.body.question4,
            "q4o1": req.body.q4choice1,
            "q4o2": req.body.q4choice2,
            "q4o3": req.body.q4choice3,
            "q4o4": req.body.q4choice4,
            "q5": req.body.question5,
            "q5o1": req.body.q5choice1,
            "q5o2": req.body.q5choice2,
            "q5o3": req.body.q5choice3,
            "q5o4": req.body.q5choice4
        },
        (err, survey) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
            res.redirect('/surveys');
        });
}

// Short SURVEY Create and Read 
module.exports.displayCreateShortPage = (req, res, next) => {
    res.render('create-edit-short', { title: 'Create Short Answer Survey', surveys: '', buttonName: 'Create' });
}

module.exports.processCreateShortPage = (req, res, next) => {

    SurveyShort.create({
            "title": req.body.surveyTitle,
            "q1": req.body.question1,
            "q1o1": req.body.q1choice1,
            "q2": req.body.question2,
            "q3": req.body.question3,
            "q4": req.body.question4,
            "q5": req.body.question5
        },
        (err, survey) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
            res.redirect('/surveys');
        });
}

// True or False SURVEY Create and Read 
module.exports.displayCreateTruePage = (req, res, next) => {
    res.render('create-edit-true-false', { title: 'Create True or False Survey', surveys: '', buttonName: 'Create' });
}

module.exports.processCreateTruePage = (req, res, next) => {

    SurveyTrue.create({
            "title": req.body.surveyTitle,
            "q1": req.body.question1,
            "q1T": req.body.q1choiceT,
            "q1F": req.body.q1choiceF,
            "q1N": req.body.q1choiceN,
            "q2": req.body.question2,
            "q2T": req.body.q2choiceT,
            "q2F": req.body.q2choiceF,
            "q2N": req.body.q2choiceN,
            "q3": req.body.question3,
            "q3T": req.body.q3choiceT,
            "q3F": req.body.q3choiceF,
            "q3N": req.body.q3choiceN,
            "q4": req.body.question4,
            "q4T": req.body.q4choiceT,
            "q4F": req.body.q4choiceF,
            "q4N": req.body.q4choiceN,
            "q5": req.body.question5,
            "q5T": req.body.q5choiceT,
            "q5F": req.body.q5choiceF,
            "q5N": req.body.q5choiceN
        },
        (err, survey) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
            res.redirect('/surveys');
        });
}

// Read and Update for Edit Page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end();
        }
        res.render('create-edit', { title: 'Edit Survey', surveys: surveyToEdit, buttonName: 'Edit' })
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.updateOne({ _id: id }, {
            "title": req.body.surveyTitle,
            "q1": req.body.question1,
            "q1T": req.body.q1choiceT,
            "q1F": req.body.q1choiceF,
            "q1N": req.body.q1choiceN,
            "q2": req.body.question2,
            "q2T": req.body.q2choiceT,
            "q2F": req.body.q2choiceF,
            "q2N": req.body.q2choiceN,
            "q3": req.body.question3,
            "q3T": req.body.q3choiceT,
            "q3F": req.body.q3choiceF,
            "q3N": req.body.q3choiceN,
            "q4": req.body.question4,
            "q4T": req.body.q4choiceT,
            "q4F": req.body.q4choiceF,
            "q4N": req.body.q4choiceN,
            "q5": req.body.question5,
            "q5T": req.body.q5choiceT,
            "q5F": req.body.q5choiceF,
            "q5N": req.body.q5choiceN
        },
        (err) => {
            console.log(err);
            res.end();
        });
    res.redirect('/surveys');
}


// Read and Update for Participate Page
module.exports.displayParticipatePage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        if (err) {
            console.log(err);
            res.end();
        }
        res.render('participate', { title: 'Participate', surveys: surveyToEdit })
    });
}

module.exports.processParticapatePage = (req, res, next) => {
    console.log({
        "Title": req.body.surveyTitle,
        "Question 1": req.body.question1,
        "Answer to Question 1T": req.body.q1answer,
        "Question 2": req.body.question2,
        "Answer to Question 2": req.body.q1answerT,
        "Question 3": req.body.question3,
        "Answer to Question 3": req.body.answerToQuestion3,
        "Question 4": req.body.question4,
        "Answer to Question 4": req.body.answerToQuestion4,
        "Question 5": req.body.question5,
        "Answer to Question 5": req.body.answerToQuestion5,
    });
    res.redirect('/home');
}


module.exports.processDeletePage = (req, res, next) => {
    let id = req.params.id;
    Survey.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/surveys');
    });
}