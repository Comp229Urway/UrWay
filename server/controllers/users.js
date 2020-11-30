let express = require('express');
const { data } = require('jquery');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let User = require('../models/users');


module.exports.registerUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hashed=>{
        const user = new User({
            username: req.body.username,
            password: hashed,
            email: req.body.email,
            dateCreated: req.body.dateCreated,
            contact: req.body.contact
        });
        user.save().then(result => {
            res.json({message: "Registration Successful"});
        }).catch(err=> {
            res.json({
                err: err
            })
        });
    })
    
    
}

module.exports.loginUser = (req, res, next) => {
    User.findOne({ uername: req.body.username })
    .then(user=> {
        if(!user){
            return res.json({message: 'Auth Failed'});
        }
        bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if(!result){
            return res.json({message: 'Auth Failed'});
        }
        const token = jwt.sign({username: user.username}, 'Secret',
        {expiresIn: "1h"});
        res.json({
            message: "User Found!",
            token: token
        });
    })
    .catch(err => {
        return res.json({message: 'Auth Failed'});
    });
}

