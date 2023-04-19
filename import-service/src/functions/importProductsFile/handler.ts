import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { HTTP_CODE } from "@libs/httpCodes";
import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "../../libs/api-gateway";

const importProductsFile = async (event: APIGatewayProxyEvent) => {
  try {
    const client = new S3Client({ region: "us-east-1" });
    const { name: fileName } = event.queryStringParameters;
    const params = {
      Bucket: "aws-shop-course-import",
      Key: `uploaded/${fileName}`,
    };
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    return formatJSONResponse(HTTP_CODE.OK, { url });
  } catch (err) {
    return formatJSONResponse(HTTP_CODE.SERVER_ERROR, err);
  }
};

export const main = importProductsFile;