--- 
draft: false
date: "2019-03-02"
title: "WebSockets with the serverless framework"
tags: serverless
description: "Setting up WebSockets with the serverless framework, API Gateway and AWS"
keywords: ["serverless, aws, WebSockets, apigateway"]
aliases:
  - /posts/websockets-with-the-serverless-framework/
---

AWS API Gateway (APIG) is a very versatile product which plays a fundamental role when building applications in the AWS ecosystem. It's not an exception for the case of serverless with AWS Lambda where it acts as an HTTP bridge to your functions. Recently, AWS expanded its capabilities by introducing [WebSockets support](https://aws.amazon.com/blogs/compute/announcing-WebSocket-apis-in-amazon-api-gateway/), this is fantastic news for serverless architects because it means that now you can add stateful features to your serverless application. APIG is now capable of handling WebSocket connections for you so you can focus on providing the functions to react to the different type of events. This is a big deal, think about what takes to keeping a WebSocket channel open and available, well, all of that is completely handled for you!

Let's see how it's done!

[If you are one of those who likes seeing the code first, I created a sample application for this post, you can find it [here](https://github.com/ccverak/serverless-WebSockets-demo)]


## Components and use cases involved

We have three main components:

- The client (ex: Web Browsers used by our users)
- APIG itself which holds the persistent connection
- Our AWS Lambda functions

And the use cases:

- The client initiates a WebSocket connection
- The client sends a message
- The client receives a message
- The client disconnects

![Websockets flow diagram](/assets/images/posts/websockets-with-the-serverless-framework-WebSockets-flow-diagram.png)

## Connecting your functions

Routes are a concept that represents the connection that should be made between APIG and your functions. There are special and custom types of routes. 

**$connect, $disconnect and $default routes**

`$connect` and `$disconnect`: These are self-explanatory, they are used to connect functions and react to the different WebSocket events. 

```bash
wscat -c wss://<my-api-id>.execute-api.us-east-1.amazonaws.com/dev?userId=2
```

This example uses a cli tool called `wscat` (which you can find [here](https://www.npmjs.com/package/wscat)) to connect to the WebSocket server, the connection it's successful if the function is executed returns successfully, after that the connection remains open.

`$default`: is used as a fallback route for every communication sent through the WebSocket channel.

```json
// Connected to: wss://<my-api-id>.execute-api.us-east-1.amazonaws.com/dev?userId=2
{ "body": "hello!" }
```

This example, sends, after a successful connection, a message to the server. It will be processed by the function reacting to `$default` events because it doesn't provide an `action` to declare a custom route.

`Custom routes`: Let's say you prefer to have different topics with different roles, for that you can create a custom route. The `action` key in the messages helps you to route the message to one function or another. You'll get more details below.

## Making things work with the serverless framework

1) Check the serverless framework, it should be 1.38.0 or superior, otherwise there it won't have WebSockets events support

2) Configure the required IAM policies

```yaml{4-9}
provider:
  name: aws
  runtime: nodejs8.10
  iamRoleStatements:
  - Effect: Allow
    Action:
      - "execute-api:ManageConnections"
    Resource:
      - "arn:aws:execute-api:*:*:**/@connections/*"
```

3) Configure the functions that will handle every route

```yaml{5-8,12-13,17-18}
functions:
  wsConnectionHandler:
    handler: handler.wsConnectionHandler
    events:
      - WebSocket:
          route: $connect
      - WebSocket:
          route: $disconnect
  wsDefaultHandler:
    handler: handler.wsDefaultHandler
    events:
      - WebSocket:
          route: $default
  wsSendMessageHandler:
    handler: handler.wsSendMessageHandler
    events:
      - WebSocket:
          route: sendMessage
```

Here we configure the routes mapping. I have included an example for a custom route key called `sendMessage`, which could handle the messages sent between users in a chat application.

Let's see now, how we can handle these events:

Connect & disconnect:

```javascript
module.exports.wsConnectionHandler = (event, context, callback) => {
  console.log(event);

  if (event.requestContext.routeKey === '$connect') {
    const connectionId = event.requestContext.connectionId;
    // ...
  } else if (event.requestContext.routeKey === '$disconnect') {
    const connectionId = event.requestContext.connectionId;
    // ...
  }
};
```

The custom route:

```javascript
module.exports.wsSendMessageHandler = (event, context, callback) => {
  const senderConnectionId = event.requestContext.connectionId;
  const body = JSON.parse(event.body);
  // ...
}
```

Sending a message to certain user (which is internally identified with a `connectionId`):

```javascript{8-13}
const AWS = require('aws-sdk');
const endpoint = requestContext.domainName + '/' + requestContext.stage;
const apigwManagementApi = new AWS.ApiGatewayManagementApi({
  apiVersion: "2018-11-29",
  endpoint
});

const params = {
  ConnectionId: connectionId,
  Data: JSON.stringify({what: 'ever'})
};

apigwManagementApi.postToConnection(params).promise();
```

Most of the time, you will have to store in the database every user's `connectionId` which is provided in the connection phase in order to do real things such as sending a message from server to user via the `postToConnection` API, check more details [here](https://github.com/ccverak/serverless-WebSockets-demo)

## Usage

Here is an example scenario of how it should look like a chat between two users: 

1) User 1 connects:

```bash
wscat -c wss://<my-api-id>.execute-api.us-east-1.amazonaws.com/dev?userId=1
```

1) User 2 connects:

```bash
wscat -c wss://<my-api-id>.execute-api.us-east-1.amazonaws.com/dev?userId=2
```

3) User 1 sends a message to the user 2:

```bash
// Connected to: wss://<my-api-id>.execute-api.us-east-1.amazonaws.com/dev?userId=1
{ "action": "sendMessage", "destinationUserId": "2","body":"hello there!"}
```

4) User 2 receives the message

```bash
// Connected to: wss://<my-api-id>.execute-api.us-east-1.amazonaws.com/dev?userId=2
{ "senderId": "1","body":"hello there!"}
```


## Pricing

You can check the pricing [here](https://aws.amazon.com/api-gateway/pricing/#WebSocket_APIs).

In my opinion, it seems reasonable for the value it provides.

## Did I miss something?

Please reach out if you find some mistake or have any suggestions, they are all very welcome!

Till the next time! }
