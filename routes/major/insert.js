const router = require('express').Router();
const mongoose = require('mongoose');

let Major = mongoose.model('Major');

router.get('/', async (req, res, next) => {
    res.render('/major/insert');
});

module.exports = router;