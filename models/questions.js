const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model('questions', questionSchema);
module.exports = Question;