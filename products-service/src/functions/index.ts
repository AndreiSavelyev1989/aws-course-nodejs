import { handlerPath } from "@libs/handler-resolver";

export const getProductsList = {
  handler: `${handlerPath(__dirname)}/getProductsList/handler.getProductsList`,
  events: [
    {
      http: {
        method: "get",
        path: "products",
        cors: true,
        responses: {
          200: {
            description: "Product list received successfully",
            bodyType: "Products",
          },
          404: {
            description: "Products not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  ],
};

export const getProductById = {
  handler: `${handlerPath(__dirname)}/getProductById/handler.getProductById`,
  events: [
    {
      http: {
        method: "get",
        path: "products/{id}",
        cors: true,
        responses: {
          200: {
            description: "Product received successfully",
            bodyType: "Product",
          },
          404: {
            description: "Product not found",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  ],
};

export const createProduct = {
  handler: `${handlerPath(__dirname)}/createProduct/handler.createProduct`,
  events: [
    {
      http: {
        method: "post",
        path: "products",
        cors: true,
        responses: {
          200: {
            description: "Product created successfully",
            bodyType: "Product",
          },
          400: {
            description: "Something went wrong",
          },
          500: {
            description: "Internal server error",
          },
        },
      },
    },
  ],
};