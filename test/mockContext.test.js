'use strict';

var test = require('tape');

var mockContextCreator = require('../mockContext.js');

var ctxOpts = {
  functionName: 'LambdaTest',
  functionVersion: 1,
  invokedFunctionArn: 'arn:aws:lambda:eu-west-1:655240711487:function:LambdaTest:ci'
};
var contextObjectKeys = [ 'succeed', 'fail', 'done', 'getRemainingTimeInMillis', 'functionName', 'functionVersion', 'invokedFunctionArn', 'memoryLimitInMB', 'awsRequestId', 'logGroupName', 'logStreamName', 'identity', 'clientContext', 'timeInMillis'];


test('mockContextCreator:', function(t) {
  t.test('no opts: returns an object with done, succeed and fail methods and all other keys set to empty strings or empty objects', function(st) {
    var context = mockContextCreator({}, test);
    st.deepEquals(Object.keys(context), contextObjectKeys);
    st.equals(typeof context.done, 'function');
    st.equals(typeof context.succeed, 'function');
    st.equals(typeof context.fail, 'function');
    st.equals(context.functionName, "");
    st.equals(context.functionVersion, "");
    st.equals(context.invokedFunctionArn, "");
    st.equals(context.memoryLimitInMB, "");
    st.equals(context.awsRequestId, "");
    st.equals(context.logGroupName, "");
    st.equals(context.logStreamName, "");
    st.deepEquals(context.identity, {});
    st.deepEquals(context.clientContext, {});
    st.end();
  });
  t.test('opts: properties in options object are assigned to corresponding property in the context', function(st) {
    var context = mockContextCreator(ctxOpts, test);
    st.equals(context.functionName, ctxOpts.functionName);
    st.equals(context.functionVersion, ctxOpts.functionVersion);
    st.equals(context.invokedFunctionArn, ctxOpts.invokedFunctionArn);
    st.end();
  });
  t.end();
});

test('Context methods', function(t) {
  t.test('context.succeed: calls callback with the result', function(st) {
    function test(result) {
      st.equals(result, "test passed");
      st.end();
    };
    var context = mockContextCreator(ctxOpts, test);
    context.succeed("test passed");
  });
  t.test('context.succeed: stringifies the result if it is an object', function(st) {
    function test(result) {
      st.deepEquals(result, '{"result":"test passed"}');
      st.end();
    };
    var context = mockContextCreator(ctxOpts, test);
    context.succeed({ result: "test passed" });
  });
  t.test('context.succeed: calls callback null if no result', function(st) {
    function test(result) {
      st.equals(result, null);
      st.end();
    };
    var context = mockContextCreator(ctxOpts, test);
    context.succeed();
  });
  t.test('context.fail: calls callback with the error', function(st) {
    function test(error) {
      st.equals(error, "test failed");
      st.end();
    };
    var context = mockContextCreator(ctxOpts, test);
    context.fail("test failed");
  });
  t.test('context.fail: calls callback with null if no error', function(st) {
    function test(error) {
      st.equals(error, null);
      st.end();
    };
    var context = mockContextCreator(ctxOpts, test);
    context.fail();
  });
  t.test('context.done: calls callback with result if error is null', function(st) {
    function test(result) {
      st.equals(result, "test passed");
      st.end();
    };
    var context = mockContextCreator(ctxOpts, test);
    context.done(null, "test passed");
  });
  t.test('context.done: calls callback with error if error is not null', function(st) {
    function test(error, result) {
      st.equals(error, "Error")
      st.end();
    };
    var context = mockContextCreator(ctxOpts, test);
    context.done("Error");
  });
  t.test('context.getRemainingTimeInMillis: return the correct time', function(st) {
    function callBack() {};
    ctxOpts.timeInMillis = 100;
    var context = mockContextCreator(ctxOpts, callBack);
    st.equal(context.getRemainingTimeInMillis(), 100);
    st.end()
  });
  t.test('context.getRemainingTimeInMillis: returns 0 when timeInMillis is not sepcified', function(st) {
    function callBack() {};
    ctxOpts.timeInMillis = '0';
    var context = mockContextCreator(ctxOpts, callBack);
    st.equal(context.getRemainingTimeInMillis(), 0);
    st.end();
  })
  t.end();
})
