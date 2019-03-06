--- 
draft: false
date: 2019-03-02T22:31:20+01:00
title: "Serverless websockets"
categories: serverless
description: "Serverless websockets"
keywords: "serverless, aws, websockets, apigateway"
---

AWS API Gateway (APIG) is a very versatile product which plays a fundamental role when building applications in the AWS ecosystem. It's not an exception for the case of serverless with AWS Lambda, where it plays as a HTTP bridge to trigger functions. Recently, AWS expanded its capabilities by introducing [websockets support](https://aws.amazon.com/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/), this is fantastic news for serverless architects because it means that now you can add stateful features to your serverless application, APIG will handle the WebSocket connections for you and trigger your functions under certain events.

It's not simple to understand how things work so I have put together a simple example of a chat using the serverless framework. You can find a working example [here](https://github.com/ccverak/serverless-websockets-demo) if interested.

## How things work

Taking as reference the previous image, let's get get a bit deeper into details:

We have three main components:
- The client (ex: Web Browsers used by our users)
- APIG, the websocket server frontend
- Our Lambda functions

The flow is as follows:

![helo](/images/Websockets-flow-diagram.png)

1) The client connects to the WebSocket
   ---> APIG accepts the connection and calls the lambda function which reacts to the "connect" events
   <--- Your function returns with success or failure, wether or not the connection was successful 

## The application description

We are going to build a chat where every user identifies himself when connecting to the socket so he can send messages to any other user in the system using its userId or receive messages from others.

First thing it's to double check you have serverless framework version 1.38 or superior, which includes support for using API Gateway's WebSockets API. For our particular case, we will use DynamoDB to store the WebSocket connection ids for every user so we can re use them when sending messages between them.

{{< hl data-options="language-javascript line-numbers" data-line-options="1">}}
function a(p){
  console.log("asd", p);
  return 10;
}
{{< /hl >}}

```javascript "line-numbers"
function a(p){
  console.log("asd", p)
  return 10;
}
```
