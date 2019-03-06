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
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

answerSchema.methods.update = function (updates, callback) {
    Object.assign(this, updates, { created: new Date() });
    this.save();
};

answerSchema.methods.vote = function (dir, callback) {
    if(dir === 'up') {
        this.votes++;
    } else if(dir === 'down') {
        this.votes--;
    }
    this.save();
};

const Answer = mongoose.model('answers', answerSchema);
module.exports = Answer;
