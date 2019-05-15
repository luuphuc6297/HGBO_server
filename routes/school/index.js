const mongoose = require('mongoose');
const router = require('express').Router();
let University = mongoose.model('University');

const UniController = require('../../controller/university');

router.use('/insert', require('./insert'));

router.get('/', UniController.Uni_get_all);

router.get('/searchid',UniController.Uni_get_id);

router.get('/search/:name', UniController.Uni_get_name_uni );

router.post('/',UniController.Uni_post);

router.delete('/delete', UniController.Uni_delete);

module.exports = router;