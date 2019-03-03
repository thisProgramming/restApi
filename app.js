const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;

app.listen(port, () => console.log(`Server Running at port ${port}...`));