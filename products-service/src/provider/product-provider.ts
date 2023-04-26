import { TABLE_NAMES } from "@constants/index";
import { dynamoDB } from "../db/tools";
import { CreateProductBody, Product, Products} from "../types/api-types";
import { v4 } from "uuid";

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
  createProduct: async (product: CreateProductBody) => {
    const { description, price, title, count } = product;
    const id = v4();
    const productBody = { id, description, price, title };
    const stockBody = { product_id: id, count };

    const transactItems = [
      {
        Put: {
          TableName: process.env.PRODUCTS_TABLE_NAME as string,
          Item: productBody,
        },
      },
      {
        Put: {
          TableName: process.env.STOCK_TABLE_NAME as string,
          Item: stockBody,
        },
      },
    ];

    const transactParams = {
      TransactItems: transactItems,
    };

    await dynamoDB.transactWrite(transactParams).promise();
    return productBody.id;
  },
};
