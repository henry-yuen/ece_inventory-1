'use strict';

var mongoose = require('mongoose');
var InstanceSchema = require('./instances.js').schema
var mongoosePaginate = require('mongoose-paginate');

var ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  model_number: String,
  location: String,
  description: String,
  vendor_info: String,
  tags: [String],
  has_instance_objects: {
    type: Boolean,
    required: true,
    default: false
  },
  instances: [InstanceSchema]
})
ItemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Item', ItemSchema);
