const express = require('express');
const router = express.Router();
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

const question1answers = ['A', 'B', 'C'];
const question2answers = ['B', 'D'];
const question3answers = 'false';
const question4answers = 'false';
const question5answers = 'true';
const question6answers = 'false';
const question7answers = ['B', 'C'];
const question8answers = 'true';
const question9answers = 'false';
const question10answers = ['B'];

/* GET home page. */
// http:localhost:3000/

function compareArrays (array1, array2) {
    let count = 0;
    if (array1 && array2) {
        for (let i=0; i<array1.length && i<array2.length; i++) {
            if (array1[i] === array2[i]) {
                count++;
            }
        }
    }
    return count;
}

function grade (score) {
    score *= 10;
    if(score > 100 || score < 0) {
        console.log("invalid Grade");
    } else {
        switch(true) {
            case score >=80 : 
                return ("A");
            case score >=70 :
                return ('B');
            case score >=60 :
                return ("C");
            case score >=50 :
                return ("D");
            case score <50 :
                return ("F");
        }
    }
}

router.post('/check-answers', (req, res, next) => {
    const questionOneAnswer = req.body.question1;
    const questionTwoAnswer = req.body.question2;
    const questionThreeAnswer = req.body.question3;
    const questionFourAnswer = req.body.question4;
    const questionFiveAnswer = req.body.question5;
    const questionSixAnswer = req.body.question6;
    const questionSevenAnswer = req.body.question7;
    const questionEightAnswer = req.body.question8;
    const questionNineAnswer = req.body.question9;
    const questionTenAnswer = req.body.question10;
    let score = 0;
    if (compareArrays(questionOneAnswer, question1answers) === 3) {
        score++;
    }
    if (compareArrays(questionTwoAnswer, question2answers) === 2) {
        score++;
    }
    if(questionThreeAnswer === question3answers){
        score += 1;
    }
    if(questionFourAnswer === question4answers){
        score += 1;
    }
    if(questionFiveAnswer === question5answers){
        score += 1;
    }
    if(questionSixAnswer === question6answers){
        score += 1;
    }
    if (compareArrays(questionSevenAnswer, question7answers) === 2) {
        score++;
    }
    if(questionEightAnswer === question8answers){
        score += 1;
    }
    if(questionNineAnswer === question9answers){
        score += 1;
    }
    if (compareArrays(questionTenAnswer, question10answers) === 1) {
        score++;
    }
    res.cookie("score", score*10, {maxAge: COOKIE_MAX_AGE});
    res.cookie("letterGrade", grade(score), {maxAge: COOKIE_MAX_AGE});
    res.redirect('/quiz/results');
})

module.exports = router;