let express = require('express');
const { data } = require('jquery');

let Survey = require('../models/survey');

module.exports.displaySurveysPage = (req, res, next) => {
    
    Survey.find((err, data) => {
        if(err)
        {
            console.error(err);
            res.end();
        }
        console.log(data);
    res.status(200).json({message: "Get Success", survey: data});
    });
}

// MCQ SURVEY Create and Read
module.exports.displayCreatePage = (req, res, next) => {
    res.render('create', {title: 'Create Multiple Choices Questions Survey', surveys: '', buttonName: 'Create', type:'mcq'});
}

module.exports.processCreatePage = (req, res, next) => {
    /* Survey.create({
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
    }); */
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
    res.json({message: "Post Success"});
    Survey.create(req.body);
    console.log(req.body);
}

// Short SURVEY Create and Read 
module.exports.displayCreateShortPage = (req, res, next) => {
    res.render('create', {title: 'Create Short Answer Survey', surveys: '', buttonName: 'Create', type: 'sa'});
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
}

// True or False SURVEY Create and Read 
module.exports.displayCreateTruePage = (req, res, next) => {
    res.render('create', {title: 'Create True or False Survey', surveys: '', buttonName: 'Create', type: 'tof'});
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
        res.json({message: 'Get Edit Data Success', survey: surveyToEdit});
      }); 
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    /*Survey.updateOne(
      {_id:id}, 
      {
        username: req.body.username,
        surveyID: req.body.surveyID,
        surveyTitle: req.body.surveyTitle,
        description: req.body.description,
        questionType: req.body.questionType,
        questions: req.body.questions,
        answers: [req.body.q1, req.body.q2, req.body.q3, req.body.q4, req.body.q5]
      },
      (err) =>
      {
        console.log(err);
        res.end();
      });*/
      console.log(
          {
            username: req.body.username,
            surveyID: req.body.surveyID,
            surveyTitle: req.body.surveyTitle,
            description: req.body.description,
            questions: req.body.questions,
            answers: [[req.body.q1], [req.body.q2], [req.body.q3], [req.body.q4], [req.body.q5]]
          }
      );
      res.redirect('/surveys');
}


// Read and Update for Participate Page
module.exports.displayParticipatePage = (req, res, next) => {
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) => {
        console.log(surveyToEdit.answers);
        if(err)
        {
          console.log(err);
          res.end();
        }
        res.render('participate', {title:'Participate', surveys:surveyToEdit})
      });
}

module.exports.processParticapatePage = (req, res, next) => {
    console.log({
        "Title": req.body.surveyTitle,
        "Question 1":req.body.questions[0],
        "Answer to Question 1":req.body.q1,
        "Question 2":req.body.questions[1],
        "Answer to Question 2":req.body.q2,
        "Question 3":req.body.questions[2],
        "Answer to Question 3":req.body.q3,
        "Question 4":req.body.questions[3],
        "Answer to Question 4":req.body.q4,
        "Question 5":req.body.questions[4],
        "Answer to Question 5":req.body.q5,
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
        res.json({message: "Survey Deleted..."})
    });
}