let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
const userConstants = require('../constants/user');

mongoose.set('useCreateIndex', true); //To avoid deprecation warnings from new versions of MongoDB
mongoose.connect('mongodb://localhost/userAnalytics', {useNewUrlParser: true}); //To avoid deprecation warnings from new versions of MongoDB

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid email'],
    index: true
  },
  phone: {
    type: String,
    match: [/^\d{10}$/, 'is invalid phone'],
    unique: true,
    index: true
  },
  city: [{
    type: String,
    enum: userConstants.city
  }],
  gender: {
    type: String,
    enum: userConstants.gender
  },
  category: {
    type: String,
    enum: userConstants.category
  }
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
module.exports = mongoose.model('User', UserSchema);
