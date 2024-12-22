const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const fsAndWSchema = new Schema(
  {
   fsOrW: {
    type: String,
    required: true,
   },
    heading: {
      type: String,
      required: true,
    },

    subHeading: {
        type: String,
        required: false,
    },
    
    body: {
      type: String,
      required: true,
    },

    imagePath: {
      type: String,
      required: false,
    },

    area: {
      type: String,
      required: true,
    },

    contactEmail: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    offerStatus: {
      type: String,
      required: true,
    },
    
    addCost: {
      type: String,
      required: true,
    },

    durationDays: {
      type: String,
      required: true,
    },

    transportation: {
      type: String,
      required: true,
    },

    OkTAndC: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true
    },
  },
);

const FsAndW = mongoose.model('FsAndW', fsAndWSchema)
module.exports = FsAndW;