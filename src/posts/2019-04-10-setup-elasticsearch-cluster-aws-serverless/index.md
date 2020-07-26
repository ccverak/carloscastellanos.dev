---
draft: false
title: "Setting up AWS Elasticsearch with Serverless and CloudFormation"
date: "2019-04-10"
description: "Setting up AWS Elasticsearch with Serverless and CloudFormation"
tags: serverless
keywords: ["serverless, aws, elasticsearch, cloudformation"]
aliases:
  - /posts/setup-aws-elasticsearch-with-serverless/
---

Quick one! Here is how you can setup an ES cluster using the Serverless framework and CloudFormation:

```yaml
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
      Condition: CreateElasticSearch
      Properties:
        DomainName: myDomainName
        EBSOptions:
          EBSEnabled: true
          VolumeType: gp2
          VolumeSize: 20
        ElasticsearchClusterConfig:
          InstanceType: m3.medium.elasticsearch
          InstanceCount: 1
          DedicatedMasterEnabled: false
          ZoneAwarenessEnabled: false
        ElasticsearchVersion: 6.3

  Outputs:
    # Export ElasticSearch host url
    ElasticSearchHost:
      excerpt: 'ElasticSearch host url'
      Condition: CreateElasticSearch
      Value:
        Fn::GetAtt:
          - ElasticSearch
          - DomainEndpoint
      Export:
        # This name will be used to import a host url
        Name: elasticSearchHost
```

I hope you find this useful!

For more details and options you can visit the [AWS documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticsearch-domain.html)
