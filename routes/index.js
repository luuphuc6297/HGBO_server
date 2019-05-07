const express = require('express');
const router = express.Router();

router.use('/school', require('../routes/school'));
router.use('/major',require('../routes/major'));
// router.get('/major/:majorId');
// router.use('/major', require('../routes/major'));
module.exports = router;
