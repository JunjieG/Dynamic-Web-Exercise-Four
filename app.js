const express = require('express');

var app = express();
const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

const indexRoute = require('./routes/index.js');

app.use('/', indexRoute);

app.use(express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
})

// Prints a log once the server starts listening
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
