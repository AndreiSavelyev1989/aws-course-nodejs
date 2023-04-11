import { v4 } from "uuid";
import { formatJSONResponse } from "@libs/api-gateway";
import { ErrorMessage, Status } from "@constants/index";
import { CreateProductEvent } from "src/types/api-types";
import { dynamoDB } from "src/db/tools";

export const createProduct = async (event: CreateProductEvent) => {
  try {
    console.log(
      "Lambda createProducts called! Body: " + JSON.stringify(event.body)
    );
    const product = JSON.parse(JSON.stringify(event.body));
    const { description, price, title, count } = product;
    const id = v4();
    const productBody = { id, description, price, title };
    const stockBody = { product_id: id, count };

    if (!title || !description || !price || !count) {
      return formatJSONResponse({
        statusCode: Status.Error400,
        data: {
          message: ErrorMessage.Required,
        },
      });
    }

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

    return formatJSONResponse({
      statusCode: Status.Success,
      data: { id, ...product },
    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: Status.ServerError,
      data: {
        message: `${error}`,
      },
    });
  }
};
