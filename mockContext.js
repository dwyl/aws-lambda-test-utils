'use strict';
/**
* Mock Context object for testing. Takes an options object and a callback function. The callback will be called with the value passed into
* the context method.
*
* Example usage in a test:
*
*  var contextCreator      = require('./utils/mockContext.js');
*  var testEvent           = { key1: 'value1'}
*
*  describe('LambdaTest', function(){
*    it("LambdaTest: returns value when given event with key1 property", function(done) {
*
*      function test(result){
*        expect(result).to.equal("value1")
*        done();
*      };
*      var context = contextCreator({}, test); // pass in the test as the callback
*      Handler(testEvent, context);
*    });
*
**/

module.exports = function (options, cb) {
  return {
    succeed: function (result) {
      if (result === undefined) {
        return cb(null);
      } else {
        if (typeof result !== 'string'){
          return cb(JSON.stringify(result));
        } else {
          return cb(result);
        }
      }
    },
    fail: function (error) {
      if (error === undefined) {
        return cb(null);
      } else {
        return cb(error);
      }
    },
    done: function (err, result) {
      if (err) {
        return this.fail(err);
      } else {
        return this.succeed(result);
      }
    },
    functionName:       options.functionName       || "",
    functionVersion:    options.functionVersion    || "",
    invokedFunctionArn: options.invokedFunctionArn || "",
    memoryLimitInMB:    options.memoryLimitInMB    || "",
    awsRequestId:       options.awsRequestId       || "",
    logGroupName:       options.logGroupName       || "",
    logStreamName:      options.logStreamName      || "",
    identity:           options.identity           || {},
    clientContext:      options.clientContext      || {},
  };
};
