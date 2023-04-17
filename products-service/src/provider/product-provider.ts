import { TABLE_NAMES } from "@constants/index";
import { dynamoDB } from "../db/tools";
import { Product, Products } from "../types/api-types";

export const productProvider = {
  getProducts: async () => {
    const products = (
      await dynamoDB
        .scan({
          TableName: TABLE_NAMES.PRODUCTS,
        })
        .promise()
    ).Items;

    return products as Products;
  },
  getProductById: async (id: string) => {
    const result = await dynamoDB
      .query({
        TableName: TABLE_NAMES.PRODUCTS,
        KeyConditionExpression: `id = :id`,
        ExpressionAttributeValues: { ":id": id },
      })
      .promise();

    const foundProduct = result.Items && result.Items[0];

    return foundProduct as Product;
  },
};
