const express = require('express');
const router = express.Router();
const Question = require('../models/questions');

router.get('/', (req, res, next) => {
    Question.find()
            .then(questions => res.json({ questions }))
            .catch(error => next(error));
});

module.exports = router;