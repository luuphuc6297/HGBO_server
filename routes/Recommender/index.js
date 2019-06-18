const router = require('express').Router();

const RecommenderController = require('../../controller/recommender');

router.get('/', RecommenderController.Recommender);

module.exports = router