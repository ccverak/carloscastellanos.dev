--- 
draft: false
date: 2019-03-02T22:31:20+01:00
title: "Serverless websockets"
categories: serverless
description: "Serverless websockets"
keywords: "serverless, aws, websockets, apigateway"
---

AWS API Gateway (APIGW) is a very versatile product, it plays a fundamental role when building serverless applications with AWS Lambda.
Recently, the [websockets support was released](https://aws.amazon.com/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway/), this was fantastic news for serverless architects because right now you can use APIGW to act as an stateful websocket server for your existing serverless applications. Stateful applications weren't a thing to consider in a serverless context but now, you can hold a 2 way real-time connection with users without having running code! It's not magic though, APIGW handles the connection and triggers functions on websockets events.

![Api gateway architecture](/images/websockets-architecture-apigw.png)

It can be tricky to setup the whole thing up so I have putted together a simple example of a chat using the serverless framework you can find a working example [here](https://github.com/ccverak/serverless-websockets-demo).

## What we are building?

We are going to build a chat where every user identifies himself when connecting to the socket so he can send messages to any other user in the system using its userId or receive messages from other users.

First thing it's to double check you have serverless framework version 1.38 or superior, which includes support for connecting API Gateway with your functions. For our particular of a chat we will use DynamoDB to store the websocket connection ids for every user so we can re use them when sending messages between them.

