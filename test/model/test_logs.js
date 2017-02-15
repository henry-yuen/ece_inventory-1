process.env.NODE_ENV = 'test';

var mongoose = require('mongoose');
var Log = require('../../server/model/logs.js');
var Item = require('../../server/model/items.js');
var assert = require('chai').assert

describe('Logs', function() {
  it('should throw error for invalid object', function(done) {
    var log = new Log({
      initiating_user: '1234',
      items: ['53cb6b9b4f4ddef1ad47f943'],
      type: 'DELETED'
    });
    log.validate(function (err) {
      assert.isNotNull(err, 'Invalid object');
      done();
    });
  });
  it('should validate a valid object', function(done) {
    var log = new Log({
      initiating_user: '53cb6b9b4f4ddef1ad47f943',
      items: ['53cb6b9b4f4ddef1ad47f943'],
      type: 'EDIT',
      description: 'Changed quantity from 3 to 4'
    });
    log.validate(function (err) {
      assert.isNull(err, 'Valid object');
      done();
    });
  });
});
