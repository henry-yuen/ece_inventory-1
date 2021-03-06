process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Instance = require('../../server/model/instances.js');
var Item = require('../../server/model/items.js');
var assert = require('chai').assert

describe('Items', function() {
  it('should throw error for incomplete object', function(done) {
    var item = new Item({quantity: 1});
    item.validate(function (err) {
      assert.isNotNull(err, 'Invalid object');
      done();
    });
  });
  it('should throw error for invalid quantity', function(done) {
    var item = new Item({
      name: 'name',
      quantity: -1
    });
    item.validate(function (err) {
      assert.isNotNull(err, 'Invalid object');
      done();
    });
  });
  it('should validate a valid object', function(done) {
    var item = new Item({
      name: 'name',
      quantity: 2,
      model_numer: '1234',
      tags: ['thing', 'other'],
      is_asset: false
    });
    item.validate(function (err) {
      assert.isNull(err, 'Valid object');
      done();
    });
  });
  it('should validate a valid object with instances', function(done) {
    var instance = new Instance({
      serial_number: '1234',
      condition: 'NEEDS_REPAIR',
    });
    var item = new Item({
      name: 'name',
      quantity: 2,
      model_numer: '1234',
      tags: ['thing', 'other'],
      is_asset: true,
      instances: [instance]
    });
    item.validate(function (err) {
      assert.isNull(err, 'Valid object');
      done();
    });
  });
});
