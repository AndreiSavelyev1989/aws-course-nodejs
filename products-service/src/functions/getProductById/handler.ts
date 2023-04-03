import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from "aws-lambda/trigger/api-gateway-proxy";
import { formatJSONResponse } from "@libs/api-gateway";
import { productService } from "@services/product-service";
import { ErrorMessage, Status } from "@constants/index";

export const getProductById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("event", event);
    const id = event.pathParameters?.id;
    const product = await productService.getProductById(id);
    if (!product) {
      return formatJSONResponse({
        statusCode: Status.Error404,
        data: {
          message: `Product ${ErrorMessage.NotFound}`,
          error: `Product ${ErrorMessage.NotFound}`,
        },
      });
    }

    return formatJSONResponse({ statusCode: Status.Success, data: product });
  } catch (err) {
    return formatJSONResponse({
      statusCode: Status.ServerError,
      data: { message: ErrorMessage.ServerError, error: err },
    });
  }
};
