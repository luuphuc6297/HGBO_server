const express = require('express');
const router = express.Router();

router.use('/school', require('../routes/school'));
router.use('/major', require('../routes/major'));
router.use('/majorUpdate', require('../routes/majorUpdate'));
router.use('/user', require('../routes/user'));
router.use('/groupMajor', require('../routes/GroupMajor'));

module.exports = router;
