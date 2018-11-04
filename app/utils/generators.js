let UserModel = require('../models/user');
module.exports = {
  aggregationQuery: aggregationQuery
};

function aggregationQuery(key, value) {
  return (cb) => {
    let query = {};
    query[key] = value;
    UserModel.count(query, (err, count) => {
      if (err) {
        cb(err);
      } else {
        let obj = {};
        obj[value] = count;
        cb(null, obj);
      }
    });
  }
}