const express = require('express');
const router = express.Router();
const Question = require('../models/questions');
const Answer = require('../models/answers');

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

router.get('/:qId/answers', (req, res, next) => {
    Question.findById(req.params.qId)
            .then(question => {
                Answer.find({ questionId: question._id })
                      .then(answers => {
                          res.json({ answers });
                      })
                    .catch(error => {
                        next(error);
                    });
            })
            .catch(error => {
                error.message = 'This question doesn\'t exists';
                res.next(error);
            });
});

router.post('/:qId/answers', (req, res, next) => {

    Question.findById(req.params.qId)
            .then(question => {
                let body = req.body;
                let answerData = {
                    text: body.text,
                    questionId: question._id
                };
                let answer = new Answer(answerData);
                answer.save()
                      .then(ans => res.json({ answer: ans }))
                      .catch(error => next(error));
            })
            .catch(error => {
                error.message = 'This question doesn\'t exist.';
                error.status = 404;
                next(error);
    })
});

module.exports = router;