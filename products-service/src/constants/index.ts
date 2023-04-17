export const pathApi = "2g5fbkdx6e.execute-api.us-east-1.amazonaws.com";

export enum Status {
  Success = 200,
  Error404 = 404,
  Error400 = 400,
  ServerError = 500,
}

export enum ErrorMessage {
  ServerError = "Internal server error",
  NotFound = "Not found",
  Required = "Missing required fields: title, description, price or count",
}

export enum TABLE_NAMES {
  PRODUCTS = "products",
  STOCKS = "stocks",
}
