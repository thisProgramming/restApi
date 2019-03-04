const express = require('express');
const router = express.Router();
const Question = require('../models/questions');

router.get('/', (req, res, next) => {
    Question.find()
            .then(questions => res.json({ questions }))
            .catch(error => next(error));
});

router.post('/', (req, res, next) => {
    let {body} = req;
    let question = new Question(body);
    question.save()
            .then(theQuestion => res.json({ question: theQuestion }))
            .catch(error => next(error));
});

router.get('/:qId', (req, res, next) => {
    Question.findById(req.params.qId)
            .then(question => res.json({ question }))
            .catch(error => {
                error.message = "Question Not Found!";
                next(error);
            });
});

module.exports = router;