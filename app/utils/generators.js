let UserModel = require('../models/user');
module.exports = {
  aggregationQuery: aggregationQuery
};

/**
 * Generate a count query for user with respective key and value
 * @param key Column/Key for User Model
 * @param value Value we're trying to count for
 * @returns {Function}
 */
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