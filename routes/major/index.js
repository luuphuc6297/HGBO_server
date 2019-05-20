const router = require('express').Router();
const mongoose = require('mongoose');
// const paginate = require('mongoose-paginate');
const MajController = require('../../controller/major');
// let Major = mongoose.model('Major');

router.use('/insert', require('./insert'));

router.get('/', MajController.Maj_get_all);

router.get('/search', MajController.Major_get_id_and_year);

router.post('/', MajController.Maj_post);

router.delete('/delete/major', MajController.Maj_delete);


module.exports = router;