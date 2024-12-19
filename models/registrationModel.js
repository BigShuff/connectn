const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const registrationSchema = new Schema(
  {
   username: {
    type: String,
    required: true
   },
    email: {
      type: String,
      required: true
    },

    password: {
        type: String,
        required: true
    },
    
    date: {
      type: String,
      required: true
    },
    
  },
);

const Registration = mongoose.model('Registration', registrationSchema)
module.exports = Registration;