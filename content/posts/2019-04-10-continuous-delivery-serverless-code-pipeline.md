---
draft: false
title: "Blue Green deployments with Serverless and AWS Code Pipeline"
date: 2019-04-10T22:29:58+02:00
description: "Blue Green deployments with Serverless and AWS Code Pipeline"
categories: serverless
keywords: "serverless, aws, continuos delivery, canary, blue green, deloyment"
---

## 
I have written in the past in the about [Continuos Delivery](/continuous-delivery-and-why-it-matters/) and why it matters, also about Severless, the [serverless framework](https://serverless.com/) and [AWS Lambda](https://aws.amazon.com/lambda/), today I will put them all in tha jar setting up a build pipeline with AWS CodePipeline to buld test and deploy a serverless framework. Also, I will add a final touch configuring a [Blue Green] deployment for the project. Blue Green deployments you say?

![Blue Green deployment](https://martinfowler.com/bliki/images/blueGreenDeployment/blue_green_deployments.png)

[Blue green deployments](https://martinfowler.com/bliki/BlueGreenDeployment.html): The main idea of this is to deploy automatically to production having 2 versions the latest and a previous one, having the previous connected to production and switching to the latest version when it is stable enough. It also provides a clean path to perform rollbacks if something goes wrong.

[If you are one of those who likes seeing the code first, I created a sample application for this post, you can find it [here](https://github.com/ccverak/serverless-code-pipeline-cicd-demo)]

## Other terms

[AWS CodeBuild](https://aws.amazon.com/codebuild/) is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy.

[AWS CodeDeploy](https://aws.amazon.com/codedeploy/) is a fully managed deployment service that automates software deployments to a variety of compute services such as Amazon EC2, AWS Fargate, AWS Lambda, and your on-premises servers

[AWS CodePipeline](https://aws.amazon.com/codepipeline/) is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates. CodePipeline automates the build, test, and deploy phases of your release process every time there is a code change, based on the release model you define. 


## The Build specs
{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
version: 0.2

phases:
  install:
    commands:
      - npm install -g serverless
      - npm install
  build:
    commands:
      - echo 'Run tests'
  post_build:
    commands:
      - sls deploy
{{< /hl >}}


## The magic ingredient
[The serverless canary deployments plugin](https://github.com/davidgf/serverless-plugin-canary-deployments) A Serverless plugin to implement canary deployments of Lambda functions, making use of the [traffic shifting feature](https://docs.aws.amazon.com/lambda/latest/dg/lambda-traffic-shifting-using-aliases.html) in combination with [AWS CodeDeploy](https://docs.aws.amazon.com/lambda/latest/dg/automating-updates-to-serverless-apps.html)

{{< hl data-options="language-javascript line-numbers" data-line-options="8-9,16">}}
functions:
  hello:
    handler: handler.hello
    events:
      - http: GET hello  
    alarms:
      - name: ErrorAlarm
        namespace: 'AWS/Lambda'
        metric: Errors
        threshold: 1
        statistic: Minimum
        period: 60
        evaluationPeriods: 1
        comparisonOperator: GreaterThanOrEqualToThreshold
    deploymentSettings:
      type: Canary10Percent5Minutes
      alias: Live
      preTrafficHook: preHook
      postTrafficHook: postHook
      alarms:
        - ErrorAlarm
{{< /hl >}}


![Blue Green deployment results](images/bluegreen.png)
![Traffic shifting](images/traffic-shifting.png)


