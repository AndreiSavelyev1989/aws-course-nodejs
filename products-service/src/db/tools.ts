import * as AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
});

export const dynamoDB = new AWS.DynamoDB.DocumentClient();
