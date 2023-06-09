import { TABLE_NAMES } from "@constants/index";

export const dynamoDBResources = {
  ProductsTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: TABLE_NAMES.PRODUCTS,
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  },
  StocksTable: {
    Type: "AWS::DynamoDB::Table",
    Properties: {
      TableName: TABLE_NAMES.STOCKS,
      AttributeDefinitions: [
        {
          AttributeName: "product_id",
          AttributeType: "S",
        },
      ],
      KeySchema: [
        {
          AttributeName: "product_id",
          KeyType: "HASH",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    },
  },
};
