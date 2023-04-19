import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { main as importProductsFile } from "./handler";
import { HTTP_CODE } from "@libs/httpCodes";

describe("importProductFile", () => {
  it("should return a valid url", async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("S3", "getSignedUrl", jest.fn);

    const fileName = "test.csv";

    const event: Partial<APIGatewayProxyEvent> = {
      queryStringParameters: { name: fileName },
    };

    const result = await importProductsFile(event as APIGatewayProxyEvent);
    expect(result.statusCode).toBe(HTTP_CODE.OK);
    expect(result.body).toContain(
      `https://aws-shop-course-import.s3.us-east-1.amazonaws.com/uploaded/${fileName}`
    );
  });

  it("should return a server error", async () => {
    const event = {} as unknown as APIGatewayProxyEvent;

    const result = await importProductsFile(event); 
    expect(result.statusCode).toBe(HTTP_CODE.SERVER_ERROR);
  });
});
