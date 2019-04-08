--- 
draft: false
date: 2016-12-15T22:31:20+01:00
title: "Continuous delivery and why it matters"
categories: general
description: "Continuous delivery and why it matters gathers my experiences building and releasing software"
keywords: "continuous delivery, continuous integration, ci/cd, software development"
aliases:
  - /2016/12/continuous-delivery-and-why-it-matters/
  - /posts/2016-12-15-continuous-delivery-and-why-it-matters/

---
## Introduction

Building software is often under-valuated, many people think that building an app is reduced to writing code, sometimes that’s true, except when it isn’t. When the business grows you need to scale your strategy in order to stay competitive. Moving fast is important so is a matter of adapting or die. Period.

The Continuous Delivery concept is not new at all. My intention with this post is not to copy and paste definitions, instead, I want to provide a couple of patterns I’ve been using for the last 3 years. Try to understand the principle behind each one so you can be accurate in the execution.

## Continuous Delivery, WTF?

![Credit: Success image via Shutterstock](/images/continuous-delivery.jpeg)

*Credits: continuousdelivery.com*


**Continuous delivery** (CD) is a software engineering approach in which teams produce software in short cycles, ensuring that the software can be reliably released at any time. It aims at building, testing, and releasing software faster and more frequently.

## Do I need it?

Well, let me explain it better. Do you consider next items valuable in any way?

**Low risk releases:** The primary goal of CD is to make software deployments painless. Since you are deploying smaller changes, there’s less to go wrong and it’s easier to fix problems when they appear.

**Faster time to market:** Deploying smaller changes, using an automated process on building, testing and deploying definitely helps on releasing software faster. Your software is ready to be delivered at any time.

**Higher quality:** Using quality gates for different levels of automated tests and code metrics for every change ensures you are releasing the right product, built quality in.

**Lower costs**. Reducing manual tasks with automation while building, testing and deploying your software reduces considerably the costs. Your process will have less re-work, smaller feedback cycles and premature defect detection.

**Low risk release + Faster time to market + Higher quality + Lower costs = Service Level Agreement Fulfillment = Happy Customers**

## I'm convinced, how do I get there?

* Every change must be deployable and that is the priority.

* The delivery process must be automated

* Interested parties must get fast, automated feedback on the production readiness of their systems any time somebody makes a change to them

* You must have a way to make push-button deployments of any version of the software to any environment on demand

* You must have a better definition of Done. A task is finished if it is deployed in production (or in a production like) environment.

## What you can’t miss

[Continuous Integration](http://martinfowler.com/articles/continuousIntegration.html): Usually refers to integrating, building, and testing code within the development environment. Continuous Delivery builds on this, dealing with the final stages required for production deployment.

[Deployment Pipeline](http://martinfowler.com/bliki/DeploymentPipeline.html): One of the challenges of an automated build and test environment is you want your build to be fast so that you can get fast feedback, but comprehensive tests take a long time to run. A deployment pipeline is a way to deal with this by breaking up your build into stages. Each stage provides increasing confidence, usually at the cost of extra time. Early stages can find most problems yielding faster feedback, while later stages provide slower and more through probing. Deployment pipelines are a central part of [ContinuousDelivery](http://martinfowler.com/bliki/ContinuousDelivery.html).

Automate everything: As the name suggests the pattern is basically towards full automation of the delivery process.

[Build quality in](http://www.allaboutagile.com/lean-principles-2-build-quality-in/): This is one of the 7 Key Principles of Lean Software Development (more on this in later posts). Quality is obviously extremely important, or you inevitably create all sorts of waste further down the line. Build it in as early as possible in the process to avoid quality issues materializing. And build it in throughout the entire development process, not just at the end. TDD/BDD, Code Review, and Static Code Analysis are a crucial piece on this topic.

[Blue green deployments](http://martinfowler.com/bliki/BlueGreenDeployment.html): The main idea of this is to deploy automatically to production having 2 versions the latest and a previous one, having the previous connected to production and switching to the latest version when it is stable enough. It also provides a clean path to perform rollbacks if something goes wrong. In my consideration, deploying every change to production automatically is hard to achieve without releasing defects in practice. For me, it’s been better having changes automatically deployed to staging or UAT environments and after a simple human review doing a one click production deploy (which performs automatically).

[Build once, deploy everywhere](https://blog.openshift.com/build-once-deploy-anywhere/): One of the fundamental principles of Continuous Delivery is Build Binaries Only Once. Subsequent deployments, testing and releases should never attempt to build the binary artifacts again, instead reusing the already built binary. Worth to say that, in many cases, the binary is built at each stage using the same source code, and is considered to be “the same”, but it is not necessarily the same because of different environmental configuration or other factors. More on this later.

[Immutable Infrastructure](http://martinfowler.com/bliki/ImmutableServer.html): Immutable infrastructure is an approach to managing services and software deployments on IT resources wherein components are replaced rather than changed. An application or services is effectively redeployed each time any change occurs. This is a game changer. Forget about the possibility of entering to your server to modify stuff, forget there is something called SSH, seriously.

Measure everything: Having business, system, process and application metrics lets you know how your decisions and solutions impact on results, how your systems are behaving. Try to measure and collect as much information as you can so you can, learn from it, make it visible, set KPIs, alarms, make it actionable.

[Infrastructure as code](http://infrastructure-as-code.com/): Or programmable infrastructure, means writing code (which can be done using a high level language or any descriptive language) to manage configurations and automate provisioning of infrastructure in addition to deployments. This is not simply writing scripts but involves using tested and proven software development practices that are already being used in application development. This is the heart of automation and reproducible environments.

[Devops](https://devops.com/): DevOps is a term that emerged from the collision of two major related trends. The first was also called “agile system administration” or “agile operations”; it sprang from applying newer Agile and Lean approaches to operations work. The second is a much expanded understanding of the value of collaboration between development and operations staff throughout all stages of the development life cycle when creating and operating a service, and how important operations has become in our increasingly service-oriented world. Believe it, it works and plays really well with the rest of the patterns.

## Some tools to get the job done easier

I prefer to talk more about practices and less about tools but in this case, I’m going to make an exception. Tools mentioned below are kind of special ones, for instance, Docker has been a revolution along with Container Managers, without them it would be impossible to implement most of the patterns described here without spending lots of resources, if you don’t agree I will play the card of [Dynamic Sharing over Static Partitioning](http://www.slideshare.net/mesosphere/scaling-like-twitter-with-apache-mesos). There is no more to say here, enter the tools:

1- [Gitlab](https://gitlab.com/) — Code hosting and Continuous Integration, currently expanding its horizons. [It might host your Deployment Pipeline](https://about.gitlab.com/gitlab-ci/).

2- [Docker](https://www.docker.com/) — Software containerization platform. This is the absolute best tool for the job it just fit every pattern in the recipe.

3- [Mesos / Marathon](https://mesosphere.com/why-mesos/) (or DCOS)— A Container orchestration service with dynamic sharing of resources. It lets you operate your cluster as if it was a single Server. Just great, we are talking about the tool behind Twitter, Verizon, ebay, PayPal, etc. I would recommend Rolling Restarts feature in [Marathon](https://mesosphere.github.io/marathon/docs/deployments.html) to apply Blue Green deployments.

4- [ELK](https://www.elastic.co/webinars/introduction-elk-stack): This is a very strong technology stack, you just put your data there and you will be able to analyze and visualize it by building dashboards, widgets, etc. I have used it to store logs from business process, application logs, server logs, etc, from Kanban boards to Rails logs. Using ELK you’ll be able to study your systems, evaluate the impact of decisions, measure performance and process stability in a very easy way. You know where I come from, here is where you can track your KPIs.

## What about involved people?

There are entire books about it, so I won’t go deeper on this. I just want to say that the people factor is are an important in the execution of Continuous Delivery, learn how to deal and how to be a leader to be a successful executor.

## What about the software development process?

Well, that’s for another post, for now, I just want to point out the effectiveness of [Lean Software Design](http://www.allaboutagile.com/7-key-principles-of-lean-software-development-2/), the [Kanban Method](https://en.wikipedia.org/wiki/Kanban_(development)) and the [Agile Principles](http://agilemanifesto.org/principles.html).

## Conclusion

Building and managing a Software factory is not an easy task but it is not impossible. Following these battle tested patterns might help you avoid common mistakes and achieve goals faster. Stand on giant shoulders so you can be successful. Tools might help to do things easier.

![Credit: Success image via Shutterstock](/images/success-continuous-delivery.jpeg)

*Credit: Success image via Shutterstock*

## Other references and Recommendations
[Continuous Delivery: Reliable Software Releases through Build, Test, and Deployment Automation…](https://www.amazon.com/dp/0321601912?tag=contindelive-20)

[Getting Real](https://gettingreal.37signals.com/): By 37 Signals guys.
