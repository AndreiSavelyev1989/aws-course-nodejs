import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { formatJSONResponse } from "@libs/api-gateway";
import { productProvider } from "@provider/product-provider";
import { ErrorMessage, Status } from "@constants/index";
import { stockProvider } from "@provider/stock-provider";
import { Stock } from "src/types/api-types";

export const getProductsList = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event);
  
  try {
    console.log("Lambda getProducts called!");

    const [products, stocks] = await Promise.all([
      productProvider.getProducts(),
      stockProvider.getStocks(),
    ]);

    const stocksCountMap: Record<string, number> = stocks.reduce(
      (obj: Record<string, number>, stock: Stock) => {
        obj[stock.product_id] = stock.count;
        return obj;
      },
      {}
    );

    const changedProducts = products.map((product) =>
      stocksCountMap.hasOwnProperty(product.id)
        ? { ...product, count: stocksCountMap[product.id] }
        : { ...product, count: 0 }
    );

    return formatJSONResponse({
      statusCode: Status.Success,
      data: changedProducts,
    });
  } catch (err) {
    return formatJSONResponse({
      statusCode: Status.ServerError,
      data: { message: ErrorMessage.ServerError },
    });
  }
};
