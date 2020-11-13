let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    title: String,
    q1: String,

    q2: String,

    q3: String,

    q4: String,

    q5: String,

},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);