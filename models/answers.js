const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    text: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId
    },
    votes: {
        type: Number,
        default: 0
    }
});

const Answer = mongoose.model('answers', answerSchema);
module.exports = Answer;
