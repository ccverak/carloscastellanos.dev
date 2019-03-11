--- 
draft: false
date: 2019-03-02T22:31:20+01:00
title: "Serverless websockets"
categories: serverless
description: "Serverless websockets"
keywords: "serverless, aws, websockets, apigateway"
---

AWS API Gateway (APIG) is a very versatile product which plays a fundamental role when building applications in the AWS ecosystem. It's not an exception for the case of serverless with AWS Lambda, where it plays as a HTTP bridge to trigger functions. Recently, AWS expanded its capabilities by introducing [WebSockets support](https://aws.amazon.com/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/), this is fantastic news for serverless architects because it means that now you can add stateful features to your serverless application, APIG will handle the WebSocket connections for you and it will trigger your functions under certain events.

It's not simple to understand how things work so I have put together a simple example of a chat using the serverless framework. You can find a working example [here](https://github.com/ccverak/serverless-websockets-demo) if interested.

## How things work

Taking as reference the previous image, let's get get a bit deeper into how things work and how persistent connections are handled.

We have three main components:

- The client (ex: Web Browsers used by our users)
- APIG itself which holds the persistent connection
- Our AWS Lambda functions


![Message processing diagram](/images/Websockets-flow-diagram.png)

The process always goes through APIG sending an special event to our Functions once it receives WebSocket events or from our server sending to APIG a message to a particular "channel".

1) The client initiates a **connection**

  ---> APIG accepts the incoming connection and stores its connection identifier, then it calls the Function responsible for handling **connect** events

  <--- The Function returns with success or failure, whether or not the connection should be allowed

  <--- APIG interprets the Function result acknowledges the new connection

2) The client sends a message

  ---> APIG calls the respective Function responsible for handling the type of event

  <--- The Function processes the event and returns 

  <--- APIG interprets the Function result and sends the resulting data

> If the server is required to send a message to a connected client it can be done using the APIG SDK. The message is routed the the user by using its connection identifier.

3) The client **disconnects**
  
  ---> APIG calls the respective Function responsible for handling the **disconnect** events
  
  <--- The Function processes the event

## Making things work with the servereless framework

**Setting up serverless to use APIG by configuring the required policies**

{{< hl data-options="language-javascript line-numbers" data-line-options="1,7-11">}}
frameworkVersion: ">=1.38.0"

provider:
  name: aws
  runtime: nodejs8.10
  iamRoleStatements:
  - Effect: Allow
    Action:
      - "execute-api:ManageConnections"
    Resource:
      - "arn:aws:execute-api:*:*:**/@connections/*"
{{< /hl >}}

Notice the framework version requirement for the serverless framework, this is required by the next steps, otherwise we'll need a third party plugin.

**Configure our Functions as WebSockets event handlers**

{{< hl data-options="language-javascript line-numbers" data-line-options="5-8,12-13,17-18">}}
functions:
  wsConnectionHandler:
    handler: handler.wsConnectionHandler
    events:
      - websocket:
          route: $connect
      - websocket:
          route: $disconnect
  wsDefaultHandler:
    handler: handler.wsDefaultHandler
    events:
      - websocket:
          route: $default
  wsSendMessageHandler:
    handler: handler.wsSendMessageHandler
    events:
      - websocket:
          route: sendMessage
{{< /hl >}}

As explained before in lines 5 to 8 we configure what Functions are called on the **connect**, **disconnect** events, or routes in the APIG jargon. There is also a configuration for the default route which will trigger the Function when an incoming event does not specifies the route (lines 12-13). I have included an example for a custom route key, which seems to be the recommended way to deal with any your domain events such as a message between users in a chat application.

Let's see now, how we can handle these events:

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
module.exports.wsConnectionHandler = (event, context, callback) => {
  console.log(event);

  if (event.requestContext.routeKey === '$connect') {
    const userId = event.queryStringParameters.userId;
    const connectionId = event.requestContext.connectionId;

    helper.storeConnection({ userId, connectionId })
      .then(() => {
        callback(null, { statusCode: 200, body: `welcome ${userId}` });
      })
      .catch((error) => {
        console.log(error);
        callback(null, JSON.stringify(error));
      });
  } else if (event.requestContext.routeKey === '$disconnect') {
    const connectionId = event.requestContext.connectionId;

    helper.deleteConnection({ connectionId })
      .then(() => {
        callback(null, { statusCode: 200, body: 'bye!' });
      })
      .catch((error) => {
        console.log(error);
        callback(null, {
          statusCode: 500,
          body: JSON.stringify(error)
        });
      });
  }
};
{{< /hl >}}

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
module.exports.wsSendMessageHandler = (event, context, callback) => {
  console.log(event);

  helper.sendMessage(event).then(() => {
    callback(null, { statusCode: 200, body: 'message sent' })
  }).catch((error) => {
    console.log(error);
    callback(null, JSON.stringify(error));
  });
}
{{< /hl >}}

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
const AWS = require('aws-sdk');

function sendWSMessage({ requestContext, connectionId, data }) {
  const endpoint = requestContext.domainName + '/' + requestContext.stage;
  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint
  });

  const params = {
    ConnectionId: connectionId,
    Data: JSON.stringify(data)
  };

  return apigwManagementApi.postToConnection(params).promise();
}
{{< /hl >}}
