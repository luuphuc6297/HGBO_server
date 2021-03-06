const router = require('express').Router();
const mongoose = require('mongoose');

const MajController = require('../../controller/major');

router.get('/', MajController.Maj_get_all);

router.get('/search', MajController.Major_get_id_and_year);

router.get('/majorCode/', MajController.Major_get_majorCode); 

router.post('/', MajController.Maj_post);

router.delete('/delete/major', MajController.Maj_delete);


module.exports = router;