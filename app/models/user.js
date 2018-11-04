let mongoose = require('mongoose');
mongoose.set('useCreateIndex', true); //To avoid deprecation warnings from new versions of MongoDB

let uniqueValidator = require('mongoose-unique-validator');

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
    type: String
  }],
  gender: String,
  category: Number
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
module.exports = mongoose.model('User', UserSchema);
