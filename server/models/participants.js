let mongoose = require('mongoose');

// create a model class
let participantsModel = mongoose.Schema({
    surveyTitle: String,
    participants: Number,
    statistics: [{questions: [], answers:[[]]}]

},
{
    collection: "participants"
});

module.exports = mongoose.model('Participants', participantsModel);
