let express = require('express');

let Survey = require('../models/survey');

module.exports.displaySurveysPage = (req, res, next) => {
    
    Survey.find((err, data) => {
        if(err)
        {
            console.error(err);
            res.end();
        }
        res.render('surveys', {title: 'Surveys', surveys: data,
        displayName: req.user ? req.user.displayName : ''});
    });  
}

// MCQ SURVEY Create and Read
module.exports.displayCreatePage = (req, res, next) => {
    res.render('create', {title: 'Create Multiple Choices Questions Survey', surveys: '', buttonName: 'Create', type:'mcq',
        displayName: req.user ? req.user.displayName : ''});
}

module.exports.processCreatePage = (req, res, next) => {
    Survey.create({
        username: req.body.username,
        surveyID: req.body.surveyID,
        surveyTitle: req.body.surveyTitle,
        description: req.body.description,
        questionType: req.body.questionType,
        questions: req.body.questions,
        answers: [req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5]
    },
    (err, survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        res.redirect('/surveys');
    });
    /*console.log({
        username: req.body.username,
        surveyID: req.body.surveyID,
        surveyTitle: req.body.questionType,
        description: req.body.description,
        questionType: req.body.questionType,
        questions: req.body.questions,
        answers: [req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5]
    });
    res.redirect('/surveys');*/
}

// Short SURVEY Create and Read 
module.exports.displayCreateShortPage = (req, res, next) => {
    res.render('create', {title: 'Create Short Answer Survey', surveys: '', buttonName: 'Create', type: 'sa',
        displayName: req.user ? req.user.displayName : ''});
}

module.exports.processCreateShortPage = (req, res, next) => {
    
    /*SurveyShort.create({
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
    }); */
    /*console.log({
        username: req.body.username,
        surveyID: req.body.surveyID,
        surveyTitle: req.body.surveyTitle,
        description: req.body.description,
        questionType: req.body.questionType,
        questions: req.body.questions,
    });
    res.redirect('/surveys');*/
    Survey.create({
        username: req.body.username,
        surveyID: req.body.surveyID,
        surveyTitle: req.body.surveyTitle,
        description: req.body.description,
        questionType: req.body.questionType,
        questions: req.body.questions
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

// True or False SURVEY Create and Read 
module.exports.displayCreateTruePage = (req, res, next) => {
    res.render('create', {title: 'Create True or False Survey', surveys: '', buttonName: 'Create', type: 'tof',
        displayName: req.user ? req.user.displayName : ''});
}

module.exports.processCreateTruePage = (req, res, next) => {
    
    /*Survey.create({
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
    }); */
    /*console.log({
        username: req.body.username,
        surveyID: req.body.surveyID,
        surveyTitle: req.body.surveyTitle,
        description: req.body.description,
        questionType: req.body.questionType,
        questions: req.body.questions,
    });
    res.redirect('/surveys');*/
    Survey.create({
        username: req.body.username,
        surveyID: req.body.surveyID,
        surveyTitle: req.body.surveyTitle,
        description: req.body.description,
        questionType: req.body.questionType,
        questions: req.body.questions
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

// Read and Update for Edit Page
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
          console.log(err);
          res.end();
        }
        res.render('edit', {title:'Edit Survey', surveys:surveyToEdit, buttonName: 'Edit',
        displayName: req.user ? req.user.displayName : ''})
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
        "q1o1":req.body.q1choice1,
        "q1o2":req.body.q1choice2,
        "q1o3":req.body.q1choice3,
        "q1o4":req.body.q1choice4,
        "q2":req.body.question2,
        "q2o1":req.body.q2choice1,
        "q2o2":req.body.q2choice2,
        "q2o3":req.body.q2choice3,
        "q2o4":req.body.q2choice4,
        "q3":req.body.question3,
        "q3o1":req.body.q3choice1,
        "q3o2":req.body.q3choice2,
        "q3o3":req.body.q3choice3,
        "q3o4":req.body.q3choice4,
        "q4":req.body.question4,
        "q4o1":req.body.q4choice1,
        "q4o2":req.body.q4choice2,
        "q4o3":req.body.q4choice3,
        "q4o4":req.body.q4choice4,
        "q5":req.body.question5,
        "q5o1":req.body.q5choice1,
        "q5o2":req.body.q5choice2,
        "q5o3":req.body.q5choice3,
        "q5o4":req.body.q5choice4
      },
      (err) =>
      {
        console.log(err);
        res.end();
      });
      res.redirect('/surveys');
}


// Read and Update for Participate Page
module.exports.displayParticipatePage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
          console.log(err);
          res.end();
        }
        res.render('participate', {title:'Participate', surveys:surveyToEdit,
        displayName: req.user ? req.user.displayName : ''})
      });
}

module.exports.processParticipatePage = (req, res, next) => {
    console.log({
        "Title": req.body.surveyTitle,
        "Question 1":req.body.question1,
        "Answer to Question 1":req.body.answerToQuestion1,
        "Question 2":req.body.question2,
        "Answer to Question 2":req.body.answerToQuestion2,
        "Question 3":req.body.question3,
        "Answer to Question 3":req.body.answerToQuestion3,
        "Question 4":req.body.question4,
        "Answer to Question 4":req.body.answerToQuestion4,
        "Question 5":req.body.question5,
        "Answer to Question 5":req.body.answerToQuestion5,
    });
    res.redirect('/home');
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