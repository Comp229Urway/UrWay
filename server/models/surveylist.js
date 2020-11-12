let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Model = mongoose.model


let surveylistSchema = new Schema({
    surveyname: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String,
    q6: String,
}, {
    collection: 'surveylist'
});

module.exports.Model = new Model('surveylist', surveylistSchema);