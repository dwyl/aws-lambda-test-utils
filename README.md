# aws-lambda-test-utils

Testing your AWS Lambda Functions does not need to be difficult or complex.

If you are *new* to Amazon WebServices Lambda
(*or need a refresher*),
please checkout our our  
***Beginners Guide to AWS Lambda***:
https://github.com/dwyl/learn-aws-lambda

## Why?

Testing your code is *essential* everywhere you need *reliability*.


AWS Lambda has a **Testing _Console_** which is a *web-based*
way of invoking your function(s) with a given input and
monitoring the result. But this quite slow and *cannot be automated* (*yet*).

## What?

The simplest *possilbe* way we could think of for Testing
our AWS Lambda functions.

### Lambda Function `event` & `context`

Every AWS Lambda function take two parameters `event` & `context`

### `context`

The 'context' object has the following form:

```js
{
  //methods
  success,
  done,
  fail,
  getRemainingTimeInMillis,

  //properties
  functionName,
  functionVersion,
  invokedFunctionArn,
  memoryLimitInMB,
  awsRequestId,
  logGroupName,
  logStreamName,
  identity: {
    cognito_identity_id,
    cognito_identity_pool_id
  },
  clientContext: {
    client: {
      installation_id,
      app_title,
      app_version_name,
      app_version_code,
      app_package_name,
      Custom,
    },
    env: {
      platform_version
      platform,
      make,
      model,
      locale,
    }
  }
}
```

These can be specified in an options parameter.  

## *How*? (*Usage*)

### *install* `aws-lambda-test-utils` from NPM

```sh
npm install aws-lambda-test-utils --save-dev
```

### Use in your Tests



## Background Reading

+
