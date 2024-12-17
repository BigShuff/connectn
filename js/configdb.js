const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb://localhost:27017/connectn');

//check database is connected
connect.then(() => {
    console.log('Database connected successfully')
}) .catch((err) => {
    console.log(`Database can not be connected ${err}`)
})

const Schema = mongoose.Schema
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

const regInfo = mongoose.model('registrations', registrationSchema)
module.exports = regInfo;