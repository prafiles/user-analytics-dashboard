let express = require('express');
let router = express.Router();
let userView = require('../app/view/user');

// Socket.io for data synchronization with React
let webSocket = null;
router.webSocket = webSocket


/* GET users listing. */
router.get('/', function (req, res, next) {
  userView.getUser(res, req.query);
});

/* UPSERT users listing. */
router.post('/', function (req, res, next) {
  userView.upsertUser(res, req.body);
  router.webSocket.emit('data-change', 'server response on data change: hey client I got a post Request and added a new user')
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
