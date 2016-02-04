'use strict';
/**
 *  Helper functions for creating context and event objects
 *
 */

var mockContextCreator = require('./mockContext.js');
var mockEventCreator   = require('./mockEvent')

module.exports = {
  mockContextCreator: mockContextCreator,
  mockEventCreator: mockEventCreator
}
