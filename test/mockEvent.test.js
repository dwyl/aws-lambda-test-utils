'use strict';

var test = require('tape');

var mockEventCreator = require('../mockEvent.js');


test('mockEventCreator - createDynamoDBEvent', function(t) {
  t.test('no options: returns an object with 1 dynamo "INSERT" event, with the default eventSourceARN and an awsRegion of "eu-west-1"', function(st) {
    var dynamoEvent = mockEventCreator.createDynamoDBEvent();
    st.equals(dynamoEvent.Records.length, 1, "event should contain 1 Record");
    st.equals(dynamoEvent.Records[0].eventName, "INSERT", "event Record should be an 'INSERT'");
    st.equals(
      dynamoEvent.Records[0].eventSourceARN,
      "arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899",
      "event should have the default eventSourceARN as the eventSourceARN"
    );
    st.equals(dynamoEvent.Records[0].awsRegion, "eu-west-1", "event should have eu-west-1 as the region");
    st.end();
  });
  t.test('partially filled object for options: returns an object with 2 dynamo Records, with the default eventSourceARN and awsRegion', function(st) {
    var dynamoEvent = mockEventCreator.createDynamoDBEvent({events: [{type: "REMOVE", number: 1}, {type: "INSERT", number: 1}]});
    st.equals(dynamoEvent.Records.length, 2, "event should contain 2 Records");
    st.equals(dynamoEvent.Records[0].eventName, "REMOVE", "first event Record should be an 'REMOVE'");
    st.equals(dynamoEvent.Records[1].eventName, "INSERT", "second event Record should be an 'INSERT'");
    st.equals(
      dynamoEvent.Records[0].eventSourceARN,
      "arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899",
      "event should have the default eventSourceARN as the eventSourceARN"
    );
    st.equals(dynamoEvent.Records[0].awsRegion, "eu-west-1", "event should have eu-west-1 as the region");
    st.end();
  });
  t.end();
});

test('mockEventCreator - createSNSEvent', function(t) {
  t.test('no options: returns an object with 1 SNS Record, with the default TopicArn and Message', function(st) {
    var SNSEvent = mockEventCreator.createSNSEvent();
    st.equals(SNSEvent.Records.length, 1, "event should contain 1 Record");
    st.equals(SNSEvent.Records[0].Sns.TopicArn, "arn:aws:sns:EXAMPLE");
    st.equals(SNSEvent.Records[0].Sns.Message, "default test message");
    st.end();
  });
  t.end();
});

test('mockEventCreator - createSNSEvent', function(t) {
  t.test('options with string message: returns an object with 1 SNS Record, with the custom Message', function(st) {
    var SNSEvent = mockEventCreator.createSNSEvent({message: "custom message"});
    st.equals(SNSEvent.Records.length, 1, "event should contain 1 Record");
    st.equals(SNSEvent.Records[0].Sns.TopicArn, "arn:aws:sns:EXAMPLE");
    st.equals(SNSEvent.Records[0].Sns.Message, "custom message");
    st.end();
  });
  t.end();
});
test('mockEventCreator - createSNSEvent', function(t) {
  var message = {
    nested: {
      object: "test string"
    }
  };

  t.test('options with object message: returns an object with 1 SNS Record, with the custom Message', function(st) {
    var SNSEvent = mockEventCreator.createSNSEvent({message: message});
    st.equals(SNSEvent.Records.length, 1, "event should contain 1 Record");
    st.equals(SNSEvent.Records[0].Sns.TopicArn, "arn:aws:sns:EXAMPLE");
    st.equals(SNSEvent.Records[0].Sns.Message, JSON.stringify(message));
    st.end();
  });
  t.end();
});

test('mockEventCreator - createS3Event', function(t) {
  t.test('no options: returns an object with 1 S3 Record, with the default awsRegion and bucket arn', function(st) {
    var S3Event = mockEventCreator.createS3Event();
    st.equals(S3Event.Records.length, 1, "event should contain 1 Record");
    st.equals(S3Event.Records[0].awsRegion, "eu-west-1");
    st.equals(S3Event.Records[0].s3.bucket.arn, "arn:aws:s3:::mybucket");
    st.end();
  });
  t.end();
});

test('mockEventCreator - createAPIGatewayEvent', function(t) {
  t.test('no options: returns an object with default api gateway values', function(st) {
    var APIGatewayEvent = mockEventCreator.createAPIGatewayEvent();
    st.equals(APIGatewayEvent.httpMethod, "GET", "event method should be GET");
    st.equals(APIGatewayEvent.body, "default body", "event body should be 'default body'");
    st.end()
  });
  t.test('options with body and stageVariables: returns an object with custom body and stageVariables', function(st) {
    var options = {
      stageVariables: { ENV: "DEV", API_URL: 'http://api.url'},
      body: "i am a custom body"
    }
    var APIGatewayEvent = mockEventCreator.createAPIGatewayEvent(options);

    st.deepEquals(APIGatewayEvent.stageVariables, options.stageVariables, "event stageVariables should be custom stageVariables ");
    st.equals(APIGatewayEvent.body, options.body, "event body should be custom body");
    st.end()
  });
  t.end();
});
