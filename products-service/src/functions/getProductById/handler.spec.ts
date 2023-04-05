import { getProductById } from "./handler";
import { APIGatewayEventRequestContextWithAuthorizer } from "aws-lambda/common/api-gateway";
import { productsList } from "@mocks/productsList";
import { ErrorMessage, Status } from "@constants/index";

const mockEvent = {
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

describe("getProductsById handler", () => {
  it("should get successfully response", async () => {
    const event = {
      ...mockEvent,
      pathParameters: {
        id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      },
    };
    const { body, statusCode } = await getProductById(event);

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(JSON.stringify(productsList[0]));
  });

  it("should receive 404 error", async () => {
    const currentEvent = {
      ...mockEvent,
      pathParameters: {
        productId: "1",
      },
    };
    const { body, statusCode } = await getProductById(currentEvent);

    expect(statusCode).toBe(Status.Error404);
    expect(body).toEqual(
      JSON.stringify({
        message: `Product ${ErrorMessage.NotFound}`,
        error: `Product ${ErrorMessage.NotFound}`,
      })
    );
  });
});
