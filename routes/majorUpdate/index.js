const router = require('express').Router();

const MajorUpdateController = require('../../controller/majorUpdate');

router.get('/', MajorUpdateController.MajorUpdate_get_all);

// router.get('/majorCode/', MajorUpdateController.MajorUpdate_get_id); // 6
router.get('/majorCode/', MajorUpdateController.MajorUpdate_get_University_follow_majorCode);

router.get('/majorAvg/', MajorUpdateController.MajorUpdate_get_avg_major); // 7

router.get('/update/', MajorUpdateController.MajorUpdate_Update_logo_fromUni);

router.post('/', MajorUpdateController.MajorUpdate_post);

router.delete('/delete/major', MajorUpdateController.MajorUpdate_delete);

module.exports = router;