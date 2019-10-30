---
draft: false
title: "Setting up AWS Elasticsearch with Serverless and CloudFormation"
date: 2019-04-10T22:29:58+02:00
description: "Setting up AWS Elasticsearch with Serverless and CloudFormation"
categories: serverless
keywords: "serverless, aws, elasticsearch, cloudformation"
aliases:
  - /posts/setup-aws-elasticsearch-with-serverless/
---
## A very short post

Here is how you can setup an ES cluster using the Serverless framework and CloudFormation:

{{< hl data-options="language-javascript line-numbers" data-line-options="">}}
 service: my-service

provider:
  name: aws
  runtime: nodejs8.10
  stage: ${self:custom.stage}
  region: ${self:custom.region}

resources:
  Resources:
    ElasticSearch:
      Type: AWS::Elasticsearch::Domain
      Properties:
        DomainName: 'my-domain-name'
        EBSOptions:
          EBSEnabled: true
          VolumeType: gp2
          VolumeSize: 20
        ElasticsearchClusterConfig:
          InstanceType: 'm3.medium.elasticsearch'
          InstanceCount: 1
          DedicatedMasterEnabled: false
          ZoneAwarenessEnabled: false
        ElasticsearchVersion: 6.3

  Outputs:
    # Export ElasticSearch host url
    ElasticSearchHost:
      Description: 'ElasticSearch host url'
      Value:
        Fn::GetAtt:
          - ElasticSearch
          - DomainEndpoint
      Export:
        # This name will be used to import a host url
        Name: elasticSearchHost
{{< /hl >}}

I hope you find this useful!

For more details and options you can visit the [AWS documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticsearch-domain.html)
