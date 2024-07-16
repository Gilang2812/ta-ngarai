const express = require("express");
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = require('../routes/index')



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.get("/test", (req, res) => res.send("Expresssss on Vercel"));

app.listen(3001, () => console.log("Server ready on port 3000."));

module.exports = app;