import type { AWS } from "@serverless/typescript";
import {
  getProductsList,
  getProductById,
  createProduct,
  catalogBatchProcess,
} from "@functions/index";
import { pathApi } from "@constants/index";
import { dynamoDBResources } from "src/db/configResources";

const serverlessConfiguration: AWS = {
  service: "products-service",
  frameworkVersion: "3",
  plugins: ["serverless-auto-swagger", "serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "dev",
    region: "us-east-1",
    profile: "Andrei_Savelyeu",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PRODUCTS_TABLE_NAME: "products",
      STOCK_TABLE_NAME: "stocks",
      SQS_URL: {
        Ref: "SQSQueue",
      },
      SNS_ARN: {
        Ref: "CreateProductTopic",
      },
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:*"],
            Resource: [
              "arn:aws:dynamodb:${aws:region}:*:table/products",
              "arn:aws:dynamodb:${aws:region}:*:table/stocks",
            ],
          },
          {
            Effect: "Allow",
            Action: "sqs:*",
            Resource: { "Fn::GetAtt": ["SQSQueue", "Arn"] },
          },
          {
            Effect: "Allow",
            Action: ["sns:*"],
            Resource: {
              Ref: "CreateProductTopic",
            },
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    getProductById,
    getProductsList,
    createProduct,
    catalogBatchProcess,
  },
  resources: {
    Resources: {
      ...dynamoDBResources,
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "CatalogItemsQueue",
        },
      },
      CreateProductTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "CreateProductTopic",
        },
      },
      EmailSubscription1: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "andreisaveluev@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "CreateProductTopic",
          },
          FilterPolicyScope: "MessageBody",
          FilterPolicy: {
            price: [{ numeric: ["<", 40] }],
          },
        },
      },
      EmailSubscription2: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: "andreiscorpion19892010@gmail.com",
          Protocol: "email",
          TopicArn: {
            Ref: "CreateProductTopic",
          },
          FilterPolicyScope: "MessageBody",
          FilterPolicy: {
            price: [{ numeric: [">=", 40] }],
          },
        },
      },
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    autoswagger: {
      host: pathApi,
      basePath: "/dev",
    },
  },
};

module.exports = serverlessConfiguration;
