let mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

let userModel = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    dateCreated: Date,
    contact: Number,   
},
{
    collection: "users"
});
userModel.plugin(uniqueValidator);
module.exports = mongoose.model('User', userModel);
