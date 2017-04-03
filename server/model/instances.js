'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var InstanceSchema = new mongoose.Schema({
  tag: {
    type: String,
    default: function() {
      return String(new ObjectId());
    },
    unique: true
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  in_stock: {
    type: Boolean,
    default: true
  },
  custom_fields:[{
    _id: false,
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CustomField',
      required: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  }],
})

module.exports = mongoose.model('Instance', InstanceSchema);
