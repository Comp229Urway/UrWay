let express = require('express');
const { data } = require('jquery');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/users');



module.exports.registerUser = (req, res, next) => {
    const password = req.body.password;
    User.findOne({$or:[{username: req.body.username}, {email: req.body.email}]}, (err, user) => {
        if(err)
        {   
            return res.json({message: "Unknown Error!", success: false});
        }
        if(!user)
        {   bcrypt.hash(password, 10, (err, hashed) => {
            if(err)
            {
                console.log(err);
                res.end();
            }
            User.create({
                username: req.body.username,
                password: hashed,
                email: req.body.email,
                dateCreated: req.body.dateCreated,
                contact: req.body.contact
            });
        });
            return res.json({message: "User Created!", success: true});
        }
        if(user.username === req.body.username)
        {
            return res.json({message: "Username Already Exist!", success: false});
        }
        if(user.email === req.body.email)
        {
            return res.json({message: "Email Address Already in Use!", success: false});
        }
       });
    /* User.findOne({username: req.body.username}).then(result=>{
        if(result)
        {
            return res.json({message: "Username Already Exist!"});
        }
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
    }); */  
}

module.exports.loginUser = (req, res, next) => {
    User.findOne({username: req.body.username}, (err, user) => {
        if(err)
        {
            return res.json({message: "Unknown Error!", success: false});
        }
        if(!user)
        {
            return res.json({message: "Incorrect Login Credentials!", success: false});
        }
        bcrypt.compare(req.body.password, user.password, (err, same) => {
            if(err)
            {
                return res.json({message: "Incorrect Login Credentials!", success: false});
            }
            if(same)
            {
            const token = jwt.sign({username: user.username}, "Secret", {expiresIn: "1h"});
            return res.json({message: "Logged In!", token: token, username: user.username, success: true});
            }
            else
            {
                return res.json({message: "Incorrect Login Credentials!", token: null, username: null, success: false});
            }
        });
    });
    /* let fetchedUser;
    User.findOne({ username: req.body.username })
    .then(user=> {
        if(!user){
            return res.json({message: 'User Not Found'});
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        //console.log(result);
        if(!result){
            return res.json({message: 'Invalid Username and Password'});
        }
        const token = jwt.sign({username: fetchedUser.username}, "Secret",
        {expiresIn: "1h"});
        res.json({
            message: "User Found!",
            token: token,
            username: fetchedUser.username
        });
    })
    .catch(err => {
        return res.json({message: 'catch Auth Failed'});
    }); */
}

