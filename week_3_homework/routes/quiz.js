const express = require('express');
const router = express.Router();
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

router.get('/', function(req, res, next) {



//router.get('/', function(req, res, next) {
    const fullName = req.cookies.fullName;


    res.render('quiz', {name: fullName });
});

router.post('/login', (req, res, next) => {
    const fullName = req.body.fullName;
    res.cookie('fullName', fullName, {maxAge: COOKIE_MAX_AGE})
    // res.send('On results YAY! ' + fullName)
    res.redirect('../')
})



module.exports = router;


