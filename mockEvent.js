'use strict';
/**
* Functions that return mock AWS event object for testing AWS Lambda functions;
**/

module.exports = {
  createS3Event: createS3Event,
  createDynamoDBEvent: createDynamoDBEvent,
  createSNSEvent: createSNSEvent,
  createAPIGatewayEvent: createAPIGatewayEvent
}

function createDynamoDBEvent(options){
  var options = setDefaults(options, "dynamo");
  var dynamoEvent = options.events.reduce(function(obj, curr) {
    for (var i = 0; i < curr.number; i++) {
      obj.Records.push(createDynamoDBRecord(curr.type, options));
    };
    return obj;
  }, {"Records": []});

  return dynamoEvent;
}

function createDynamoDBRecord(type, options) {
  return {
    "eventID": "1",
    "eventVersion": "1.0",
    "dynamodb": {
      "Keys": {
        "Id": {
          "N": "101"
        }
      },
      "NewImage": {
        "Message": {
          "S": "New item!"
        },
        "Id": {
          "N": "101"
        }
      },
      "StreamViewType": "NEW_AND_OLD_IMAGES",
      "SequenceNumber": "111",
      "SizeBytes": 26
    },
    "awsRegion": options.awsRegion,
    "eventName": type,
    "eventSourceARN": options.eventSourceARN,
    "eventSource": "aws:dynamodb"
  }
}

function setDefaults(options, type) {
  var defaultOptions = {
    dynamo: {
      awsRegion: "eu-west-1",
      eventSourceARN: "arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899",
      events: [{type: "INSERT", number: 1}]
    },
    sns: {
      message: "default test message"
    },
    "api-gateway": {
      path: "default/path",
      method: "GET",
      headers: {
        "default-header": 'default'
      },
      queryStringParameters: {
        query: "default"
      },
      pathParameters: {
        uuid: '1234'
      },
      stageVariables: {
        ENV: "test"
      },
      body: "default body"
    }
  };

  if (typeof options !== "object") {
    return defaultOptions[type];
  }
  return Object.keys(defaultOptions[type]).reduce(function(options, curr) {
    options[curr] = options[curr] ? options[curr] : defaultOptions[type][curr]
    return options;
  }, options);
}

function createSNSEvent (options) {
  var options = setDefaults(options, "sns");
  options.message = typeof options.message === "string" ? options.message : JSON.stringify(options.message);

  return  {
    "Records": [
      {
        "EventVersion": "1.0",
        "EventSubscriptionArn": "arn:aws:sns:EXAMPLE",
        "EventSource": "aws:sns",
        "Sns": {
          "SignatureVersion": "1",
          "Timestamp": "1970-01-01T00:00:00.000Z",
          "Signature": "EXAMPLE",
          "SigningCertUrl": "EXAMPLE",
          "MessageId": "95df01b4-ee98-5cb9-9903-4c221d41eb5e",
          "Message": options.message,
          "MessageAttributes": {
            "Test": {
              "Type": "String",
              "Value": "TestString"
            },
            "TestBinary": {
              "Type": "Binary",
              "Value": "TestBinary"
            }
          },
          "Type": "Notification",
          "UnsubscribeUrl": "EXAMPLE",
          "TopicArn": "arn:aws:sns:EXAMPLE",
          "Subject": "TestInvoke"
        }
      }
    ]
  }
}

function createS3Event() {
  return {
    "Records": [
      {
        "eventVersion": "2.0",
        "eventTime": "1970-01-01T00:00:00.000Z",
        "requestParameters": {
          "sourceIPAddress": "127.0.0.1"
        },
        "s3": {
          "configurationId": "testConfigRule",
          "object": {
            "eTag": "0123456789abcdef0123456789abcdef",
            "sequencer": "0A1B2C3D4E5F678901",
            "key": "HappyFace.jpg",
            "size": 1024
          },
          "bucket": {
            "arn": "arn:aws:s3:::mybucket",
            "name": "sourcebucket",
            "ownerIdentity": {
              "principalId": "EXAMPLE"
            }
          },
          "s3SchemaVersion": "1.0"
        },
        "responseElements": {
          "x-amz-id-2": "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH",
          "x-amz-request-id": "EXAMPLE123456789"
        },
        "awsRegion": "eu-west-1",
        "eventName": "ObjectCreated:Put",
        "userIdentity": {
          "principalId": "EXAMPLE"
        },
        "eventSource": "aws:s3"
      }
    ]
  }
}

function createAPIGatewayEvent(options) {
  var options = setDefaults(options, "api-gateway");

  return {
    "resource": "/assets",
    "path": options.path,
    "httpMethod": options.method,
    "headers": options.headers,
    "queryStringParameters": options.queryStringParameters,
    "pathParameters": options.pathParameters,
    "stageVariables": options.stageVariables,
    "requestContext": {
      "accountId": "1234",
      "resourceId": "snmm5d",
      "stage": "test-invoke-stage",
      "requestId": "test-invoke-request",
      "identity": {
        "cognitoIdentityPoolId": null,
        "accountId": "1234",
        "cognitoIdentityId": null,
        "caller": "1234",
        "apiKey": "test-invoke-api-key",
        "sourceIp": "test-invoke-source-ip",
        "accessKey": "1234",
        "cognitoAuthenticationType": null,
        "cognitoAuthenticationProvider": null,
        "userArn": "arn:aws:iam::1234:user/test_user",
        "userAgent": "Apache-HttpClient/4.5.x (Java/1.8.0)",
        "user": "1234"
      },
      "resourcePath": options.path,
      "httpMethod": options.method,
      "apiId": "1234"
    },
    "body": options.body,
    "isBase64Encoded": false
  }
};
