let UserModel = require('../models/user');
const userConstants = require('../constants/user');
let generators = require('../utils/generators');
let async = require('async');

module.exports = {
  getUser: getUser,
  upsertUser: upsertUser,
  getAggregatedCount: getAggregatedCount,
  getUserCityCounts: getUserCityCounts
};

/**
 * Get user model data on the specified parameters
 * @param res Express Response Object
 * @param params Mongoose Style Query Parameters
 */
function getUser(res, params) {
  UserModel.find(params, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'Error in getting users. Check console.log for more details.'});
    } else {
      res.json(data);
    }
  });
}

/**
 * Create or update user on the basis of phone number or email
 * @param res Express Response Object
 * @param params User Object Parameters (assuming fully updated record here)
 */
function upsertUser(res, params) {
  if (!params.email && !params.phone) { //Return a bad request if both phone and email are missing
    return res.status(400).json({message: 'Need phone number or email for upserting user.'});
  }

  //We try and find user by him email or phone
  UserModel.findOne({$or: [{'email': params.email}, {'phone': params.phone}]}, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'Error in getting users while upserting user. Check console.log for more details.'});
    } else {
      if (!user) { //Create new user if we couldn't find any
        UserModel.create(params, (err, obj) => {
          if (err) {
            console.error(err);
            res.status(500).json({message: 'Error in creating user. Check console.log for more details.'});
          } else {
            console.log('User created: ', obj);
            res.json({message: 'OK'});
          }
        })
      } else { //Update the existing user

        //If the user has existing email or phone, we never let him update it, only merge the PI.
        user.email = user.email ? user.email : params.email;
        user.phone = user.phone ? user.phone : params.phone;

        //We update user category always
        user.category = params.category;

        //We append city to city list
        user.city.push(params.city);

        //And we completely ignore updates of gender
        user.save((err, obj) => {
          if (err) {
            console.error(err);
            res.status(500).json({message: 'Error in updating user. Check console.log for more details.'});
          } else {
            console.log('User created: ', obj);
            res.json({message: 'OK'});
          }
        });
      }
    }
  });
}

/**
 * Get aggregated counts for the specified key
 * @param res Express Response Object
 * @param key Key (as per user constants)
 */
function getAggregatedCount(res, key) {
  let values = userConstants[key], funcArr = [];
  if (!values) {
    return res.status(400).json({message: 'Need key to defined in constants for aggregation.'});
  }
  for (let index = 0; index < userConstants[key].length; index++) {
    funcArr[index] = generators.aggregationQuery(key, values[index]);
  }
  async.parallel(funcArr, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'Error in aggregating user information. Check console.log for more details.'});
    } else {
      res.json(result);
    }
  });
}

function getUserCityCounts(res) {
  let cities = userConstants['city'];
  let records = [];
  UserModel.find({}, 'email phone city', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'Error in getting users while getting User-City Counts. Check console.log for more details.'});
    } else {
      for (let i = 0; i < data.length; i++) {
        let user = data[i];
        let userString = user.email ? user.email : user.phone;
        for (let j = 0; j < cities.length; j++) {
          let indices = user.city.reduce(function (aggregate, element, index) {
            if (element === cities[j])
              aggregate.push(index);
            return aggregate;
          }, []);

          records.push({
            user: userString,
            city: cities[j],
            count: indices.length
          });
          console.log(cities[j], indices.length);
        }
      }
      res.json(records);
    }
  });
}