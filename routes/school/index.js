const mongoose = require('mongoose');
const router = require('express').Router();
let University = mongoose.model('University');

const UniController = require('../../controller/university');
router.use('/insert', require('./insert'));

router.get('/', UniController.Uni_get_all);

router.get('/:universityId',UniController.Uni_get_id);

router.post('/',UniController.Uni_post);

router.delete('/:universityId', UniController.Uni_delete);

router.get('/search/:name', UniController.Uni_get_name_uni );

module.exports = router;