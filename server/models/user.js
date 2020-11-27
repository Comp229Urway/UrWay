let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias

let UserSchema = Schema({
    username:
    {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    email:
    {
        type: String,
        default: '',
        trim: true,
        required: 'email is required'
    },
    displayName:
    {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },
    created:
    {
        type: Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'users'
    });


UserSchema.plugin(passportLocalMongoose);

module.exports.User = Model('User', UserSchema);
//module.exports = mongoose.model('Survey', surveyModel);