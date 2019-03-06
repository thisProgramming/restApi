const express = require('express');
const router = express.Router();
const Question = require('../models/questions');
const Answer = require('../models/answers');
const middleware = require('../middleware');

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
    Answer.find({ questionId: req.params.qId })
          .then(answers => {
              answers.sort(middleware.answerSort);
              res.json({ answers });
          })
          .catch(error => next(error));
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
            });
});

router.put('/:qId/answers/:aId', (req, res, next) => {
    Answer.findOne({ questionId: req.params.qId, _id: req.params.aId })
          .then(answer => {
              let {body} = req;
              let updates = {
                text: body.text
              };
              answer.update(updates);
              res.json({ answer });
          })
          .catch(error => next(error));
});

router.delete('/:qId/answers/:aId', (req, res, next) => {
    Answer.findOne({ questionId: req.params.qId, _id: req.params.aId })
          .then(answer => {
              answer.remove()
                    .then(() => {
                        res.json({ text: 'Removed!' });
                    })
                  .catch(error => {
                      next(error);
                  });

          });
});

router.put('/:qId/answers/:aId/vote-:dir', middleware.checkDir, (req, res, next) => {
    Answer.findOne({ questionId: req.params.qId, _id: req.params.aId })
          .then(answer => {
              answer.vote(req.params.dir);
              res.json({ answer });
          }).catch(error => next(error));
});

module.exports = router;