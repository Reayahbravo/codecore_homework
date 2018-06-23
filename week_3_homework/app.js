const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/quiz/results', (req, res) => {
  const name = req.cookies.fullName;
  const score = req.cookies.score;
  const grade = req.cookies.letterGrade;
  res.render('quizResults', {name: name, score: score, grade: grade})
});

const quizRouter = require("./routes/quiz");

app.get('/quizzes', (req, res) => {
  res.send('hello!')
});

app.use("/quiz", quizRouter);

app.get('/', (req, res) => {
  const fullName = req.cookies.fullName
  res.render('welcome', {username: fullName})
});

app.use("/quizResults", quizRouter);


const gradingRouter = require('./routes/grading');
app.use('/grading', gradingRouter);

module.exports = app;

