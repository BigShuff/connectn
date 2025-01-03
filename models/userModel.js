const mongoose = require('mongoose');
const {isEmail} = require('validator');

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
   username: {
    type: String,
    required: [true, 'Please supply a username'],
    unique: true
   },
    email: {
      type: String,
      required: [true, 'Please supply an email address'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email address']
    },

    password: {
        type: String,
        required: [true, 'Please supply a password'],
        minlength: [8, 'Minimum password length is 8 characters']
    },
    
    dateAndTime: {
      type: String,
      required: true
    },
    
  },
);

const User = mongoose.model('User', userSchema)
module.exports = User;