'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  quote: {
    type: String,
    required: 'Kindly enter the quote'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Quotes', QuoteSchema);