let express = require('express');
let Participate = require('../models/participate');

module.exports.postParticipate = (req, res, next) => {   
    Participate.create(req.body);
    res.json({message: "Post Participate Success!"});
}

module.exports.getParticipants = (req, res, next) => {
    surveyId = req.params.id;
    Participate.find({surveyID: surveyId}, (err, participantsList) => {
        if(err)
        {
            console.log(err);
            return res.json({message: err, participants: null, success: false});          
        }
        res.json({message: "Fetch Participants Success!", participants: participantsList, success: true});
    }).sort([['dateCreated', 1]]).exec();
}


