'use strict';

var test = require('tape');

var mockContextCreator = require('../mockContext.js');

test('Context methods', function(t) {
  t.test('context.succeed calls callback with the result', function(st) {
    function test(result) {
      t.equals(result, "test passed");
      st.end();
    };
    var context = mockContextCreator(test);
    context.succeed("test passed");
  });
  t.test('context.succeed stringifies the result if it is an object', function(st) {
    function test(result) {
      t.deepEquals(result, '{"result":"test passed"}');
      st.end();
    };
    var context = mockContextCreator(test);
    context.succeed({ result: "test passed" });
  });
  t.test('context.succeed calls callback null if no result', function(st) {
    function test(result) {
      t.equals(result, null);
      st.end();
    };
    var context = mockContextCreator(test);
    context.succeed();
  });
  t.test('context.fail calls callback with the error', function(st) {
    function test(error) {
      t.equals(error, "test failed");
      st.end();
    };
    var context = mockContextCreator(test);
    context.fail("test failed");
  });
  t.test('context.fail calls callback with null if no error', function(st) {
    function test(error) {
      t.equals(error, null);
      st.end();
    };
    var context = mockContextCreator(test);
    context.fail();
  });
  t.test('context.done calls callback with result if error is null', function(st) {
    function test(result) {
      t.equals(result, "test passed");
      st.end();
    };
    var context = mockContextCreator(test);
    context.done(null, "test passed");
  });
  t.test('context.done calls callback with error if error is not null', function(st) {
    function test(error, result) {
      t.equals(error, "Error")
      st.end();
    };
    var context = mockContextCreator(test);
    context.done("Error");
  });
  t.end();
})
