export const pathApi = "2g5fbkdx6e.execute-api.us-east-1.amazonaws.com";

export enum Status {
  Success = 200,
  Error404 = 404,
  ServerError = 500,
}

export enum ErrorMessage {
  ServerError = "Internal server error",
  NotFound = "Not found",
}
