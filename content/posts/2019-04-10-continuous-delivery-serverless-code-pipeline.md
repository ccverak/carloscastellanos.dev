---
draft: false
title: "Canary deployments with Serverless and AWS Code Pipeline"
date: 2019-04-10T22:29:58+02:00
description: "Canary deployments with Serverless and AWS Code Pipeline. How to implement a fully automated, one push, zero downtime, blue-green deployments of serverless application. Continuous delivery all the way down with a simple workflow!"
categories: serverless
keywords: "serverless, aws, continuos delivery, canary, blue green, deployment"
aliases:
  - /posts/canary-deployments-with-serverless-and-aws-code-pipeline/
---

## Introduction

Nowadays, one of the biggest changes in software development has been the increased frequency of deployments. Time to market has become essential so it's rare to have monthly or yearly releases. This huge leap in the way we release products has brought many other challenges because it's more likely to deploy defects to production. How we can move fast without risking too much?

This remains true in the Serverless context. Serverless has changed the way we build, test, and deploy products. Microservices are now more common, local deployments of the whole system have become almost impossible, automated testing has moved to the mainstream to try ensuring all the pieces fit together. Still, continuously deploying changes is hard. Let's review how existing deployment strategies can help us to deal with the problem and how to implement some of them.


## Deployment strategies

**Rolling Deployments**: Rolling, phased, or step deployments are a type of deployment where an application’s new version gradually replaces the old one. The actual deployment happens over a period of time. During that time, new and old versions will coexist without affecting functionality or user experience. This process makes it easier to roll back any new component incompatible with the old components.

![Rolling deployment](images/rolling-deployments.png)

**Blue-Green, Red-Black or A/B Deployment**: This strategy consists in having two identical production environments work in parallel. One is the currently-running production environment receiving all user traffic (Blue). The other is a clone of it, but idle (Green).

![Blue Green deployment](images/bluegreen-deployments-1.png)

The new version of the application is deployed in the green environment and tested for functionality and performance. Once the testing results are successful, application traffic is routed from blue to green. Green then becomes the new production.

![Blue Green deployment](images/bluegreen-deployments-2.png)

If there is an issue after green becomes live, traffic can be routed back to blue.

**Canary Deployment**: Canary deployment is like blue-green but instead of switching from blue to green in one step, you use a phased approach.
With canary deployment, you deploy a new application code in a small part of the production infrastructure. Once the application is signed off for release, only a few users are routed to it. This minimizes any impact.

With no errors reported, the new version can gradually roll out to the rest of the infrastructure

![Blue Green deployment](images/canary-deployments.png)



## Implementation

As you may notice all the strategies above require a lot of efforts from the infrastructure and operations side of things. The good news is that in the scope of serverless you don't run full copies of the application all the time, things are executed only when they are used so no need to worry about maintaining two clusters, etc, etc, also, AWS provides all the tools you will need to implement the deployment strategy you prefer.

Let's show how we can implement `Canary` deployments for a serverless project using AWS Code Pipeline.

[If you are one of those who likes seeing the code first, I created a sample application for this post, you can find it [here](https://github.com/ccverak/serverless-code-pipeline-cicd-demo)]
### The tools

What we will be using?

[Serverless framework](https://serverless.com/): The Serverless Framework is a free and open-source web framework written using Node.js. Serverless is the first framework that was originally developed for building applications exclusively on AWS Lambda, a serverless computing platform provided by Amazon as a part of the Amazon Web Services. Currently, applications developed with Serverless can be deployed to other function as a service providers, including Microsoft Azure with Azure Functions, IBM Bluemix with IBM Cloud Functions based on Apache OpenWhisk, Google Cloud using Google Cloud Functions, Kubeless based on Kubernetes, etc, etc.

[AWS CodeBuild](https://aws.amazon.com/codebuild/) is a fully managed continuous integration service that compiles source code, runs tests, and produces software packages that are ready to deploy.

[AWS CodeDeploy](https://aws.amazon.com/codedeploy/) is a fully managed deployment service that automates software deployments to a variety of compute services such as Amazon EC2, AWS Fargate, AWS Lambda, and your on-premises servers.

[AWS CodePipeline](https://aws.amazon.com/codepipeline/) is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates. CodePipeline automates the build, test, and deploy phases of your release process every time there is a code change, based on the release model you define. It coordinates CodeBuild and CodeDeploy to build a delivery pipeline.

### Setup

Follow these steps to set up the Code Pipeline using Code Build & Code Deploy:

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
  9. For Build specifications, choose Use a `buildspec` file
  10. Choose Continue to CodePipeline. This returns to the CodePipeline console and creates a CodeBuild project that uses the buildspec.yml in your repository for configuration. The build project uses a service role to manage AWS service permissions. This step might take a couple of minutes
  11. Choose Next

3. In the Add deploy stage, skip the deploy stage (this will be configured by our project)
4. Confirm the pipeline creation

We are now ready to push changes to our Github project which will trigger the Code Pipeline via webhooks and Run our project-automated code deploy.

Congratulations if you got to this point you are 80% done :>

[If you are an automation advocator don't worry, there are ways to automate this process, let me recommend you this references:]

[Tutorial: Create a Pipeline with AWS CloudFormation](https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-cloudformation.html)

[aws-codepipeline-cloudformation](https://github.com/mozilla-iam/aws-codepipeline-cloudformation)

[aws-codepipeline](https://www.terraform.io/docs/providers/aws/r/codepipeline.html)



### The Build spec

As described before, the build stage is specified in a `buildspec.yml` archive. This is basically the script of execution, if you want to dive into details [this is a good place to start](https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html)

It's quite simple as you see, you have an `install` section, a `build` and `post_build` sections which allows you to install dependencies build, test and deploy in the order you want. Here is the one we are using in the project:

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


Good news! at this point the continuous integration and deployment process is ready, every push to the Github repository will be automatically built, tested and deployed, woohoo!

Hey, but what about the Canary deployments?

### Enter the magic ingredient

As we mentioned before the Code deploy stage of the pipeline it was going to be configured by our project. Here is where the good part starts :) 

There is already a serverless plugin for this!

[The serverless canary deployments plugin](https://www.npmjs.com/package/serverless-plugin-canary-deployments) A Serverless plugin to implement canary deployments of Lambda functions, making use of the [traffic shifting feature](https://docs.aws.amazon.com/lambda/latest/dg/lambda-traffic-shifting-using-aliases.html) in combination with [AWS CodeDeploy](https://docs.aws.amazon.com/lambda/latest/dg/automating-updates-to-serverless-apps.html)

This plugin supports several deployment settings in the same way CodeDeploy does, for this particular case we will be using  `Canary10Percent5Minutes`

**What does it mean?**

Shift 10% of traffic to the new deployment while keeping the rest of the traffic with the current deployment, if any alarm it's triggered after 5 minutes, then the new deployment will replace the current deployment. If an alarm is triggered, the new deployment fails.

**These are also available:**

- `Canary10Percent10Minutes` 
- `Canary10Percent15Minutes`
- `Canary10Percent30Minutes`
- `Linear10PercentEvery1Minute`
- `Linear10PercentEvery2Minutes`
- `Linear10PercentEvery3Minutes`
- `Linear10PercentEvery10Minutes` 

**In general, this is what Canary* and Linear* stands for:**

**Canary:** Traffic is shifted in two increments. You can choose from predefined canary options. The options specify the percentage of traffic that's shifted to your updated Lambda function version in the first increment, and the interval, in minutes, before the remaining traffic is shifted in the second increment.

**Linear:** Traffic is shifted in equal increments with an equal number of minutes between each increment. You can choose from predefined linear options that specify the percentage of traffic that's shifted in each increment and the number of minutes between each increment.


[You can check more details in the [plugins' documentation](https://www.npmjs.com/package/serverless-plugin-canary-deployments)]
or in the [AWS documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html)

There is only one last piece missing, we also need to set up alarms in order to trigger the rollback if something goes wrong, for that we'll use [serverless-plugin-aws-alerts](https://www.npmjs.com/package/serverless-plugin-aws-alerts). This plugin helps us to create a CloudWatch alarm that gets fired if an error occurs in a particular function, notice that in the `deploymentSettings` section we have to pass the name of the alarms the deployment should monitor.

Here is the gist the `serverless.yml`, notice the `Alarms` and `deploymentSettings`:

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


**Pro tip**: You can use also `preHook` and `postHook` which are functions that get executed **before** and **after** the traffic shifting if you want to do a bit more than with the deployment patterns, such as `end to end testing` to trigger rollback if some test fails. Check [here](https://github.com/davidgf/serverless-plugin-canary-deployments#configuration) for more details.

### Usage

Time to push changes to your project and see the Pipeline execution!

You can track the results of the tests in the Code Build section and the deployment progress in the Code deploy section of your pipeline, you will see something like this:

![Traffic shifting](images/traffic-shifting.png)

...and then to play with the endpoints during the deployment to see how the traffic shifting works, notice you can also force rollbacks.

![Canary deployment results](images/bluegreen.png)


## Conclusion

Applying canary deployments is a good solution if you want safer releases while staying agile. Its self-healing nature is fundamental in a CI/CD workflow. It's also a good fit for **Serverless** and **AWS** with the help of The **Serverless** framework, **AWS Code Pipeline** and the **Canary deployments plugin**.

There you go! now you know how to implement fully automated, **one push**, **zero downtime**, **canary deployment** of **serverless** applications. **Continuous delivery** all the way down with a simple workflow!

Happy coding }

PS: If I have made a mistake or you have any suggestions, please feel free to reach out!

