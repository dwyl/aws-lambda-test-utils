'use strict';
/**
* Mock Context object for testing. Takes a callback function which will be called with the value passed into
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
*      var context = contextCreator(test); // pass in the test as the callback
*      Handler(testEvent, context);
*    });
*
**/

module.exports = function (cb) {
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
    functionName: 'LambdaTest',
    functionVersion: 1,
    invokedFunctionArn: 'arn:aws:lambda:eu-west-1:645246713457:function:LambdaTest:ci'
  };
};
