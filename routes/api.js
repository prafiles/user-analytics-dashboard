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

module.exports = router;
