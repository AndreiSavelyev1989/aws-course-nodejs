import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { formatJSONResponse } from "@libs/api-gateway";
import { productProvider } from "@provider/product-provider";
import { ErrorMessage, Status } from "@constants/index";

export const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productProvider.getProducts();

    return formatJSONResponse({ statusCode: Status.Success, data: products });
  } catch (err) {
    return formatJSONResponse({
      statusCode: Status.ServerError,
      data: { message: ErrorMessage.ServerError, error: err },
    });
  }
};
