import {
  APIGatewayProxyResult,
  APIGatewayProxyEvent,
} from "aws-lambda/trigger/api-gateway-proxy";
import { formatJSONResponse } from "@libs/api-gateway";
import { productProvider } from "@provider/product-provider";
import { ErrorMessage, Status } from "@constants/index";
import { stockProvider } from "@provider/stock-provider";

export const getProductById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Lambda getProductById called!");

    const id = event.pathParameters?.id;

    const [product, stock] = await Promise.all([
      id && productProvider.getProductById(id),
      id && stockProvider.getStockByProductId(id),
    ]);

    const count = (stock && stock.count) || 0;

    if (!product) {
      return formatJSONResponse({
        statusCode: Status.Error404,
        data: {
          message: `Product ${ErrorMessage.NotFound}`,
        },
      });
    }

    return formatJSONResponse({
      statusCode: Status.Success,
      data: { ...product, count },
    });
  } catch (err) {
    return formatJSONResponse({
      statusCode: Status.ServerError,
      data: { message: ErrorMessage.ServerError },
    });
  }
};
