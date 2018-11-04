let express = require('express');
let router = express.Router();
let userView = require('../app/view/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  userView.getUser(res, req.query);
});

/* UPSERT users listing. */
router.post('/', function (req, res, next) {
  userView.upsertUser(res, req.body);
});

/* GET aggregation user-city counts. */
router.get('/user-city', function (req, res, next) {
  userView.getUserCityCounts(res);
});

/* GET aggregation on key for the existing users. */
router.get('/:key', function (req, res, next) {
  userView.getAggregatedCount(res, req.params.key);
});

module.exports = router;
