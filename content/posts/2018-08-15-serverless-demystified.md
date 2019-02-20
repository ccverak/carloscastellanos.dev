--- 
draft: false
date: 2018-08-15T22:31:20+01:00
title: "Serverless Demystified"
categories: serverless
description: "Serverless Demystified"
keywords: "serverless, aws, pros, cons"
---

After a couple of years of full-time working on many Serverless Framework projects over AWS, it’s time to talk about my experiences with the platform and the issues and goodies I’ve found in my way. My reflections are in the scope of AWS Lambda but many of them may apply to other Serverless and FaaS providers.

### How Serverless is different?

The **Serverless** main idea is that as programmers we can forget about servers and focus on code, in a model where you don’t pay if your clients don’t use your service aka: pay per usage. This translates into massive power on demand at very low prices being someone else's responsibility the high availability concerns of the platform.

### What about FaaS?

**Functions as a Service**. This is one of the ways providers are approaching the **Serverless** model. Your code should be based in small units or **functions**, tiny portions of working functionality, which can react to events. You build applications connecting many functions by sending events. Cloud providers provide very rich ecosystems to create event driven architectures using push, pull, request-response, or custom models for interaction with queues, pub-sub services, file systems, IoT tooling, etc. **FaaS** in general lead programmers to build **microservices** architectures, **nano-services** (when your functions are too small and decoupled) and on the least cases monoliths (when your app is built as one big function)

### Hype

**Serverless** and **FaaS** are ***hyped***. [You know what does it mean right?](https://www.gartner.com/en/research/methodologies/gartner-hype-cycle)

### **What should you consider before adopting Serverless / FaaS?**

* Being a hyped technology, you will find yourself trying to keep up with the new features or changes, the bigger your app is, the harder to keep up.

* Being a new technology, there are many things you will have to figure out by yourself, also communities are smaller and talent is harder to find.

* Start building products using microservices (or nano-services) architectures has its risks, you might not know from the beginning which are the boundaries in the application, this might lead to big refactors of functions and its interactions the second might have implications on a big part of your system.

* Going monolith first will help you to progressively understand your product but having just a big function is not good for performance, at the end of the day, Serverless it is all about spawning a container with your code, the bigger the container the slower is to run your code on demand.

* Auto-scaling can be a two edged sword, if you don't control it, you will be writing code that might kill your down-stream services such as your database.

* Visibility might be tricky, is hard to get how your system works when there are many pieces interacting after one request, logging is hard, debugging is hard, traceability is hard.

* DevOps is still needed, you still need to implement logging, alerts, CI, CD, tests, stages, etc.

* If you have **N** functions then you will have to configure logging, alerts, CI, CD, tests, stages, etc **N** times.

* You will have to invest heavily in automated tests, unit tests and contract tests.

* You will have to invest heavily in architectural patterns and Event Driven Architectures.

* Pay per usage might be expensive for high volumes.

* Response latencies might be high due to the "run on demand" scheme.

*Note: Some of the issues above also exist outside the scope of Serverless or FaaS but my stress point is that Serverless is not the magic tool that many people think it is. Don’t get me wrong, I’m still a Serverless advocator and supporter, I just want to put all the cards in the table.*

### My recommendations

* Start small, with demos, smaller apps, or parts of existing apps.

* Understand your team, your organization and product before approaching architectures. Do you have one team, many teams, what are the boundaries of your product? All of that may have an impact on the architecture ([Conway’s law](https://en.wikipedia.org/wiki/Conway%27s_law))

* Find the middle ground between microservices and monoliths before starting to lower when possible, the impact of changes if you make wrong decisions.

* Implement Correlation Ids for logging so it would be easier to trace one request across the system if your request hits many functions.

* Use an aggregated logging service.

* Start testing from the beginning, focus on contract tests and module integration tests if possible.

* Analyze Per Per Usage plans and required response latencies for the type of application you are building to avoid problems in the future.

* Embrace Domain Driven Design. Understanding your product and solving problems is the ultimate goal and the most important things to make your product succeed.

Good to have:

* Understanding of Command Query Responsibility Segregation, Event sourcing and Asynchronous Service Communication patterns. Kappa architecture.

### Pros of Serverless/FaaS

Pros are obvious, many of them were already stated, for clarity, this are the ones I find important: Forgetting about servers and Pay Per Usage benefits are **huge** for most cases (I know of relative big applications paying under a hundred dollars per month), For **FaaS** in particular: The cloud providers have a rich ecosystem, any type of service you might need there is a chance is already there. Event based communications is a proven way of communication in distributed systems. First push to production can be done very fast with the existing tooling and huge systems can be maintained without an operations team.

### Conclusion

It is clear that there is no magic in Serverless or FaaS but there are still benefits in the pricing model and infrastructure management. I hope this helps some of you out there planning to bring **Serverless** to your organization. Leave your comment or claps if you found this useful.

Till the next time ;)
