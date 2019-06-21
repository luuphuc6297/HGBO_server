const router =require('express').Router();
const mongoose = require('mongoose');

const GroupMajorController = require('../../controller/groupMajor');

router.get('/', GroupMajorController.GroupMajor_get_all); //5 
// router.get('/major/', GroupMajorController.GroupMajor_get_code_major);

module.exports = router;