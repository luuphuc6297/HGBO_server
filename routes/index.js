const express = require('express');
const router = express.Router();

router.use('/school', require('../routes/school'));
router.use('/major',require('../routes/major'));
router.use('/user', require('../routes/user'));

module.exports = router;
