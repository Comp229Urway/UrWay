let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    title: String,

    questions: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String,

    answers: String,

    a1: String,
    a2: String,
    a3: String,
    a4: String,
    a5: String,

},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);