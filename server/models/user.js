
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
    password:
    {
        type: String,
        default: '',
        trim: true,
        required: 'password is required'   
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

let options = ({ missingPasswordError: 'Wrong /Missing Password' });

UserSchema.plugin(passportLocalMongoose, options);

module.exports.User = Model('User', UserSchema);