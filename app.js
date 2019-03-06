const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require('body-parser');
const mainRouter = require('./routes');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/restApi', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));

app.use('/questions', mainRouter);

app.use((req, res, next) => {
    let error = new Error('Not Found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status = error.status || 500;
    res.json({ message: error.message, status: res.status });
});

app.listen(port, () => console.log(`Server Running at port ${port}...`));