let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    title: String,
    q1: String,
    q1o1: String,
    q1o2: String,
    q1o3: String,
    q1o4: String,
    q2: String,
    q2o1: String,
    q2o2: String,
    q2o3: String,
    q2o4: String,
    q3: String,
    q3o1: String,
    q3o2: String,
    q3o3: String,
    q3o4: String,
    q4: String,
    q4o1: String,
    q4o2: String,
    q4o3: String,
    q4o4: String,
    q5: String,
    q5o1: String,
    q5o2: String,
    q5o3: String,
    q5o4: String
}, {
    collection: "surveys"
});

//module.exports = mongoose.model('Survey', surveyModel);

/* TRUE FALSE Survey*/

let surveyModelTF = mongoose.Schema({
    title: String,
    q1: String,
    q1T: String,
    q1F: String,
    q1N: String,
    q2: String,
    q2T: String,
    q2F: String,
    q2N: String,
    q3: String,
    q3T: String,
    q3F: String,
    q3N: String,
    q4: String,
    q4T: String,
    q4F: String,
    q4N: String,
    q5: String,
    q5T: String,
    q5F: String,
    q5N: String,
}, {
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModelTF);
/* FOR NEXT WEEK
let surveyModelShort = mongoose.Schema({
    title: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String
},
{
    collection: "surveys"
});

module.exports = mongoose.model('SurveyShort', surveyModelShort);*/