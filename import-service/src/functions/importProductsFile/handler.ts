import { formatJSONResponse } from "@libs/api-gateway";
import { HTTP_CODE } from "@libs/httpCodes";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getSignedUrl } from "src/helpers/s3helper";

export const importProductsFile = async (event: APIGatewayProxyEvent) => {
  console.log("Lambda importProductFile called!");
  const { name } = event.queryStringParameters;

  try {
    const url = await getSignedUrl(name);

    return formatJSONResponse(HTTP_CODE.OK, { url });
  } catch (err) {
    return formatJSONResponse(HTTP_CODE.SERVER_ERROR, err);
  }
};

export const main = importProductsFile;