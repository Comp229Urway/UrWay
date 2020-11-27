let mongoose = require('mongoose');


// create a model class
let surveyModel = mongoose.Schema({
    username: String,
    surveyID: Number,
    surveyTitle: String,
    description: String,
    questionType: String,
    questions: [String],
    answers: [[String]]
},
{
    collection: "surveys03"
});

module.exports = mongoose.model('Survey', surveyModel);
