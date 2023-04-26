import { formatJSONResponse } from "@libs/api-gateway";
import { ErrorMessage, Status } from "@constants/index";
import { CreateProductEvent, CreateProductBody } from "src/types/api-types";
import { productProvider } from "@provider/product-provider";

export const createProduct = async (event: CreateProductEvent) => {
  try {
    console.log(
      "Lambda createProducts called! Body: " + JSON.stringify(event.body)
    );
    const product: CreateProductBody = JSON.parse(event.body);
    const { description, price, title, count } = product;

    if (!title || !description || !price || !count) {
      return formatJSONResponse({
        statusCode: Status.Error400,
        data: {
          message: ErrorMessage.Required,
        },
      });
    }
    const productId = await productProvider.createProduct(product);

    return formatJSONResponse({
      statusCode: Status.Success,
      data: { id: productId, ...product },
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
