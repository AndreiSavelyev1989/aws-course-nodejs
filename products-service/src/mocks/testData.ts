import { APIGatewayEventRequestContextWithAuthorizer } from "aws-lambda/common/api-gateway";

export const products = [
  {
    description: "Short Product Description 1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "ProductTest1",
  },
];

export const stocks = [
  {
    product_id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    count: 6,
  },
];

export const productsInStockMock = [
  {
    description: "Short Product Description 1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "ProductTest1",
    count: 6,
  },
];

export const mockEvent = {
  body: ``,
  headers: {},
  httpMethod: "GET",
  isBase64Encoded: false,
  path: "/",
  queryStringParameters: {},
  pathParameters: {},
  stageVariables: {},
  multiValueHeaders: {},
  requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<{}>,
  resource: "/",
  multiValueQueryStringParameters: {},
};
