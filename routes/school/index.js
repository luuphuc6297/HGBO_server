const mongoose = require('mongoose');
const router = require('express').Router();

let University = mongoose.model('University');

const UniController = require('../../controller/university');


router.get('/', UniController.Uni_get_all); //1 //GET ALL UNI (WEB, APP)

router.get('/search/name/', UniController.Uni_get_name_uni); //2

// router.get('/search/', UniController.Uni_get_name_uni_major); //GET MAJOR OF UNI FOLLOW UNI CODE AND YEAR(WEB)

router.get('/id/', UniController.Uni_get_id); //3 //GET UNIVERSITY FOLLOW ID

router.get('/major/search/', UniController.Uni_get_name_uni_majorUpdate); //4 //GET UNI FOLLOW UNI CODE (APP)

// router.get('/hotkey/', UniController.Uni_hot_key); //GET HOT KEY

router.post('/', UniController.Uni_post);

router.delete('/delete', UniController.Uni_delete);

module.exports = router;