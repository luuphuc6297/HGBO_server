const mongoose = require('mongoose');
const router = require('express').Router();
let University = mongoose.model('University');

const UniController = require('../../controller/university');

router.use('/insert', require('./insert'));

router.get('/', UniController.Uni_get_all); //GET ALL UNI (WEB, APP)

router.get('/search/', UniController.Uni_get_name_uni_major); //GET MAJOR OF UNI FOLLOW UNI CODE AND YEAR(WEB)

router.get('/major/search/', UniController.Uni_get_name_uni_majorUpdate); //GET UNI FOLLOW UNI CODE (APP)

router.get('/hotkey/', UniController.Uni_hot_key); //GET HOT KEY

router.get('/:unicode', UniController.Uni_get_id); //GET UNIVERSITY FOLLOW ID

router.get('/search/:name', UniController.Uni_get_name_uni);

router.post('/', UniController.Uni_post);

router.delete('/delete', UniController.Uni_delete);

module.exports = router;