import { HTTP_CODE } from "./httpCodes";

export const formatJSONResponse = (
  statusCode: HTTP_CODE = HTTP_CODE.OK,
  response: Record<string, unknown> = {}
) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(response),
  };
};