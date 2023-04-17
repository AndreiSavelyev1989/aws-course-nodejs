import { TABLE_NAMES } from "@constants/index";
import { dynamoDB } from "../db/tools";
import { Stock } from "../types/api-types";

export const stockProvider = {
  getStocks: async () => {
    const stocks = (
      await dynamoDB
        .scan({
          TableName: TABLE_NAMES.STOCKS,
        })
        .promise()
    ).Items;

    return stocks as Stock[];
  },

  getStockByProductId: async (id: string) => {
    const result = await dynamoDB
      .query({
        TableName: TABLE_NAMES.STOCKS,
        KeyConditionExpression: `product_id = :id`,
        ExpressionAttributeValues: { ":id": id },
      })
      .promise();

    const foundProduct = result.Items && result.Items[0];

    return foundProduct as Stock;
  },
};
