const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb+srv://thisProgramming:123Sindiguza@restapi-zfkhy.gcp.mongodb.net/test?retryWrites=true/restApi', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '));


app.listen(port, () => console.log(`Server Running at port ${port}...`));