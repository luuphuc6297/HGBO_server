const router = require('express').Router();
const mongoose = require('mongoose');


const MajorUpdateController = require('../../controller/majorUpdate');

router.get('/', MajorUpdateController.MajorUpdate_get_all);

router.get('/searchId', MajorUpdateController.MajorUpdate_get_id);

router.post('/', MajorUpdateController.MajorUpdate_post);

router.delete('/delete/major', MajorUpdateController.MajorUpdate_delete);

module.exports = router;