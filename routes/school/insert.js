let router = require('express').Router();
let mongoose = require('mongoose');

let University = mongoose.model('University');

router.get('/', async (req, res, next) => {
    res.render('school/insert');
});

module.exports = router;