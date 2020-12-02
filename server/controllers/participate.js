let express = require('express');
const participate = require('../models/participate');
let Participate = require('../models/participate');



module.exports.postParticipate = (req, res, next) => {   
    participate.create(req.body);
    res.json({message: "Post Participate Success!"});
}


