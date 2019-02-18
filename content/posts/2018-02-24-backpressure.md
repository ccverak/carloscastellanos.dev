--- 
draft: false
date: 2018-02-24T22:31:20+01:00
title: "Back-pressure"
categories: serverless
description: "Back-pressure mechanisms for serverless and data intensive applications"
---

## Intro

Almost two years ago I decided to start a journey of learning [AWS Lambda](https://aws.amazon.com/lambda/) and [Serverless Framework](https://serverless.com/), being a Ruby/Rails developer is not a common thing to do as many of you might think, but if you know me well you will understand, I’m always open to learning new things, constantly trying to strengthen my problem-solving skills by expanding my horizons. I still have a passion on Ruby but this experience has been amazing and complementary; I’ve learned a lot about these tools and their ecosystem, and from a more general perspective, about architectural resources to be used when dealing with massive data volumes and real-time applications. Today I want to take some ideas related to architecture and not to any particular technology and put them here as a reference for the future me and those who might be interested, in particular, I will try to describe a solution I’m tending to use for the case massive data ingestion.

### Capacity

Dealing effectively with big systems requires a lot of effort in many areas but I’m going to focus on Capacity management this time, clearly, if we want stable systems we need to pursue predictability by doing some capacity planning, why you say? first, we don't want to overwhelm any service on our system on traffic spikes, second, who wants to spend lots of money in infrastructure just to remain operational under occasional bursts? third, service outage is never an option.

### HTTP Bursts

The HTTP protocol is a push-based protocol, meaning that the clients push requests to the server and it's server responsibility return responses otherwise the client will get an error. There isn't another choice than accepting all the possible requests coming from the external world, period. This is not a simple problem to solve, there are limits and slow steps in the process, timeouts and errors happen under high load. Hopefully, the tooling has gotten great these days, we have Docker, Kubernetes and many Cloud Providers supporting **auto-scaling** and **load balancing** features out of the box which is amazing, however, head ups! accepting the requests is just the tip of the iceberg.

![Push systems could overwhelm the capacity of the receiver when the producer is faster than the consumer creating bottlenecks.](/images/backpressure-1.png)

**Push systems could overwhelm the capacity of the receiver when the producer is faster than the consumer creating bottlenecks.**

Accepting the request is just the beginning of the request-response cycle, what happens to the rest of the system under a request burst? how it gets affected by accepting a massive number of requests?

Well, the requests will produce a number actions unleashed by the request processing logic, these actions will go through every part of the system at very high rate hitting every component in the road. Normally, you will see this as a normal flow in a back-end but it depends, it's a matter of bandwidth and capacity. Let’s take as an example the Database, when the number of ingested requests grows significantly for a period of time, a propagation of writes at very high speed will require a lot of effort from Database to handle the load and eventually it could cause a service outage if the load is intensive. Since this is an unpredictable situation, users connect on different times, from different countries, etc. you will be will be forced to give more power to the Database just to deal with bursts (most of the time occasional and random burts), being over-provisioned must of the time for no reason. This situation is not maintainable for DBAs neither for the business, it's unpredictable nature prevents you to play with resource allocation and it’s not cost effective at all. (Even under predictable high load, is not feasible use a resource allocation policy for the Databases based on the HTTP request load, a **linear** matching of both is still not cost effective)

![All the requests that entered the system will hit the Database at a high rate, causing an outage eventually.](/images/backpressure-2.png)

**All the requests that entered the system will hit the Database at a high rate, causing an outage eventually.**

How to prevent this to happen without losing the capacity of accepting a high number of requests?

The way I see it is that we can do better, the solution comes from trying to create more predictable write patterns where you can write fast enough but not going over capacity by regulating the rates.

### Enter pull systems

![Pull systems have a steady flow that provides predictability. The consumer processes things at its own pace.](/images/backpressure-3.png)

**Pull systems have a steady flow that provides predictability. The consumer processes things at its own pace.**

The idea is to introduce an intermediary or contention service between your HTTP endpoints and your Database to en-queue requests and process them later. I'm not talking about a random type of service but about a specialized system capable of accepting data at high rates and delivering it to downstream services in a reliable way, such as [RabbitMQ](https://www.rabbitmq.com/), [SQS](https://aws.amazon.com/sqs/) or more sophisticated platforms as [Kafka](https://kafka.apache.org/), [Kinesis](https://aws.amazon.com/kinesis), my favorite ones. What does this pattern bring to the table? In one hand, you'll be able to **accept big amounts of data** and **regulate the speed it gets sent** **to downstream services**, and on the other hand, you'll get way **better options for error handling and recovery**. In other words, it provides a better architecture to operate systems at full capacity.

![The contention service allows to propagate events at regulated speed avoiding downstream services from going over capacity](/images/backpressure-4.png)

**The contention service allows to propagate events at regulated speed avoiding downstream services from going over capacity**

The back-pressure mechanism is required most the times when the publisher is faster than the consumer, this is basically the case of any modern system out there, we live in a connected world where the amount of data to be processed is growing at unstoppable speed.

### Serverless architectures

As the last point, I would like to highlight the importance of this pattern and the capacity management way of thinking when using **Serverless** architectures, due to its auto-scaling features you will face the issues exposed before, if you use **AWS** **Lambda**, your HTTP functions will eventually require a lot from your Database, even from **DynamoDB** with its **predictable performance**, you’ll struggle with [Write Throttles](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ProvisionedThroughput.html) and its side effects [Lambda retries](https://docs.aws.amazon.com/lambda/latest/dg/retries-on-errors.html) which might cause inconsistencies in your data when you hit the limits. Worth to mention that it’s not something particular to any Cloud Provider, similar problems occur on other platforms including any type of deployments having multiple instances of application services.

### Conclusion

* Be. Cautious. With. HTTP. Auto-Scaling.

* Do some sort of capacity management and planning of your system.

* Use pull systems and back-pressure to prevent overwhelming downstream services.

## Last words

What I have just covered is just the beginning, actually, I only tackled a way to *optimize writes*, there are many things involved on this area, starting from *reads optimization* I plan to write a bit further about my experiences. Being only a piece in a bigger picture the results still feel enormous, it will please me if you now start thinking about **Capacity planning** and contention mechanisms to prevent service outage or poor predictability on your systems, I guess that will make my day :)

If you are an eager learner, here are some terms you can dig into **Domain Driven Design** (**DDD**), **Event Sourcing (ES), Command Query Responsibility Segregation (CQRS), Eventual Consistency, Stream Processing and Kappa architectures.**

Happy coding! }
