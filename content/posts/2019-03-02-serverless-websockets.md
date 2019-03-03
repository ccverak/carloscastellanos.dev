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
