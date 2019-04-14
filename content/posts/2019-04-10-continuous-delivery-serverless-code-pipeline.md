---
draft: false
title: "Blue Green deployments with Serverless and AWS Code Pipeline"
date: 2019-04-10T22:29:58+02:00
description: "Blue Green deployments with Serverless and AWS Code Pipeline. How to implement a fully automated, one push, zero downtime, blue-green deployments of serverless applications, continuous delivery all the way down with a fairly simple workflow,"
categories: serverless
keywords: "serverless, aws, continuos delivery, canary, blue green, deployment"
---

## Introduction

I have written in the past in the about [Continuos Delivery](/continuous-delivery-and-why-it-matters/) and why it matters, also about Severless, the [serverless framework](https://serverless.com/) and [AWS Lambda](https://aws.amazon.com/lambda/), today I will put them all in the jar setting up a build pipeline with AWS CodePipeline to build test and deploy a serverless framework based project. Also, I will add a final touch configuring a `Blue Green deployment` for the project. Blue Green deployments you say?

![Blue Green deployment](https://martinfowler.com/bliki/images/blueGreenDeployment/blue_green_deployments.png)

[Blue green deployments](https://martinfowler.com/bliki/BlueGreenDeployment.html): The main idea of this is to deploy automatically to production having 2 versions the latest and a previous one, having the previous connected to production and switching to the latest version when it is stable enough. It also provides a clean path to perform rollbacks if something goes wrong.

[If you are one of those who likes seeing the code first, I created a sample application for this post, you can find it [here](https://github.com/ccverak/serverless-code-pipeline-cicd-demo)]

## Naming and tools

[Serverless framework](https://serverless.com/): The Serverless Framework is a free and open-source web framework written using Node.js. Serverless is the first framework that was originally developed for building applications exclusively on AWS Lambda, a serverless computing platform provided by Amazon as a part of the Amazon Web Services. Currently, applications developed with Serverless can be deployed to other function as a service providers, including Microsoft Azure with Azure Functions, IBM Bluemix with IBM Cloud Functions<> based on Apache OpenWhisk, Google Cloud using Google Cloud Functions, Kubeless based on Kubernetes, etc, etc.

[AWS CodeBuild](https://aws.amazon.com/codebuild/) is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy.

[AWS CodeDeploy](https://aws.amazon.com/codedeploy/) is a fully managed deployment service that automates software deployments to a variety of compute services such as Amazon EC2, AWS Fargate, AWS Lambda, and your on-premises servers

[AWS CodePipeline](https://aws.amazon.com/codepipeline/) is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates. CodePipeline automates the build, test, and deploy phases of your release process every time there is a code change, based on the release model you define. 

## Setup

Follow this steps to setup the Code Pipeline using Code Build Code Deploy:

1. To create your pipeline and add a source stage, do the following:

  1. Sign in to the AWS Management Console and open the CodePipeline console at https://console.aws.amazon.com/codepipeline/.
  2. Click on Create pipeline
  3. Provide your pipeline name, provide a role or check *"Allow AWS CodePipeline to create a service role so it can be used with this new pipeline"* if you don't know what it means and select Default location in the artifact store, 
  4. Click Next
  5. On the Step 2: Add source stage page, in Source provider, choose GitHub, and then choose Connect to GitHub.
  6. Approve the Github permissions and provide the repository name and branch, it should something like:
    ![Github setup](images/github-setup-code-pipeline.png)
  7. Click next

2. In Add build stage, add a build stage:

  1. In Build provider, choose AWS CodeBuild. Allow Region to default to the pipeline Region
  2. Choose Create project
  3. In Project name, enter a name for this build project
  4. In Environment image, choose Managed image. For Operating system, choose Ubuntu
  5. For Runtime, choose Node.js or the one that applies to your project, the same for the Runtime version
  6. For Service role, choose your existing CodeBuild service role or create a new one
  9. For Build specifications, choose Use a buildspec file
  10. Choose Continue to CodePipeline. This returns to the CodePipeline console and creates a CodeBuild project that uses the buildspec.yml in your repository for configuration. The build project uses a service role to manage AWS service permissions. This step might take a couple of minutes
  11. Choose Next

3. In the Add deploy stage, skip the deploy stage (this will be configured by our project)
4. Confirm the pipeline creation

We are now ready to push changes to our Github project which will trigger the Code Pipeline via webhooks and Run our project-automated Code deploy.

Congratulations if you got to this place you are 80% done, believe me, some magic is about to come!

If you are an automation advocator I recommend you this references:

[Tutorial: Create a Pipeline with AWS CloudFormation](https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-cloudformation.html)

[aws-codepipeline-cloudformation](https://github.com/mozilla-iam/aws-codepipeline-cloudformation)

[aws-codepipeline](https://www.terraform.io/docs/providers/aws/r/codepipeline.html)


### The Build spec

As described before, the build stage is specified in a `buildspec.yml` archive. This is basically the script of execution, if you want to dive into details [this is a good place to start](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)

It's quite simple as you will see and for this type of projects there is not too much to do than this:

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
version: 0.2

phases:
  install:
    commands:
      - npm install -g serverless
      - npm install
  build:
    commands:
      - npm test
  post_build:
    commands:
      - sls deploy
{{< /hl >}}

## CI/CD

Good news! at this point, the continuous integration and deployment/delivery process is ready, every push to the Github repository will be automatically built, tested and deployed woo hoo!

Hey, but what about the Blue-Green deployments?

## Enter the magic ingredient

As we mentioned before the Code deploy stage of the pipeline it was going to be configured by our project. Here is where the good part starts :) There is already a serverless plugin for this!

[The serverless canary deployments plugin](https://www.npmjs.com/package/serverless-plugin-canary-deployments) A Serverless plugin to implement canary deployments of Lambda functions, making use of the [traffic shifting feature](https://docs.aws.amazon.com/lambda/latest/dg/lambda-traffic-shifting-using-aliases.html) in combination with [AWS CodeDeploy](https://docs.aws.amazon.com/lambda/latest/dg/automating-updates-to-serverless-apps.html)

I wont go into details of the project because it covers several patterns for Blue Green deployments, for now let's stick to the basics.
The main idea is that you can provide a Blue Green pattern to your functions, as in this example `Canary10Percent5Minutes` which means:

**Shift 10% of traffic to the new deployment while keeping the rest of the traffic with the current deployment, if any alarm it's triggered after 5 minutes, then the new deployment will replace the current deployment. If an alarm is triggered, the new deployment fails**

**Pro tip**: In combination with alarms or with the `preHook` or `postHook` you can get to build smarter traffic shifting rules. More details [here](https://serverless.com/blog/manage-canary-deployments-lambda-functions-serverless-framework/) and [here](https://dev.to/davidgf/canary-deployments-in-serverless-applications-2n3d)

Here are the most significant parts of the `serverless.yml`, notice the alarm declarations and the deployment settings:

{{< hl data-options="language-javascript line-numbers" data-line-options="6-10,12,13,20-22,29,34">}}
service: canary-deployments
provider:
  name: aws
  runtime: nodejs8.10
  iamRoleStatements:
    - Effect: Allow
      Action:
        - codedeploy:*
      Resource:
        - "*"
plugins:
  - serverless-plugin-canary-deployments
  - serverless-plugin-aws-alerts       
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

## Usage

Time to push changes to your project!

You can track the the deployment progress and traffic shifting evolution in the Code deploy section of your pipeline for our case in a period of 5 minutes:

![Traffic shifting](images/traffic-shifting.png)

...and to try your endpoints to see how the traffic shifting works :)


![Blue Green deployment results](images/bluegreen.png)

## Conclusions

The point is to get more confident of your deployment process and deploy more often but ensuring you don't break anything on every push, the Blue-Green deployments are a good fit for this and the **Serverless** framework has **AWS Code Pipeline** and the **Canary deployments plugin** for you to get here.

Well, there you go! now you know how to implement fully automated, **one push**, **zero downtime**, **blue-green deployments** of **serverless** applications, continuous delivery all the way down with a fairly simple workflow, 

Happy coding }

PS: If have made a mistake or you have any suggestions, please feel free to reach out!
