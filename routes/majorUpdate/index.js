const router = require('express').Router();
const mongoose = require('mongoose');


const MajorUpdateController = require('../../controller/majorUpdate');

router.get('/', MajorUpdateController.MajorUpdate_get_all);

router.get('/majorCode/', MajorUpdateController.MajorUpdate_get_id); // Replace 6

router.get('/majorAvg/', MajorUpdateController.MajorUpdate_get_avg_major);

router.post('/', MajorUpdateController.MajorUpdate_post);

router.delete('/delete/major', MajorUpdateController.MajorUpdate_delete);

module.exports = router;