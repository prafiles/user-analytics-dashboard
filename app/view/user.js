let UserModel = require('../models/user');

module.exports = {
  getUser: getUser,
  upsertUser: upsertUser
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
      res.status(500).send({message: 'Error in getting users. Check console.log for more details.'});
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
  UserModel.findOne({$or: [{'email': params.email}, {'phone': params.phone}]}, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({message: 'Error in getting users while upserting user. Check console.log for more details.'});
    } else {
      if (!user) { //Create new user if we couldn't find any
        UserModel.create(params, (err, obj) => {
          if (err) {
            res.status(500).json({message: 'Error in creating user. Check console.log for more details.'});
          } else {
            console.log('User created: ', obj);
            res.json({message: 'OK'});
          }
        })
      } else { //Update the existing user
        user.email = user.email ? user.email : params.email;
        user.phone = user.phone ? user.phone : params.phone;
        user.category = params.category;
        user.city.push(params.city);
        user.save((err, obj) => {
          if (err) {
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