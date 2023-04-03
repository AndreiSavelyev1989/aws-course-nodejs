import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { formatJSONResponse } from "@libs/api-gateway";
import { productService } from "@services/product-service";
import { ErrorMessage, Status } from "@constants/index";

export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productService.getProducts();

    return formatJSONResponse({ statusCode: Status.Success, data: products });
  } catch (err) {
    return formatJSONResponse({
      statusCode: Status.ServerError,
      data: { message: ErrorMessage.ServerError, error: err },
    });
  }
};
