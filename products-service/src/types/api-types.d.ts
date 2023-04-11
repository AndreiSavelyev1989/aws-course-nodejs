import { APIGatewayEvent } from "aws-lambda";

export type Product = {
  description: string;
  id: string;
  price: number;
  title: string;
  count?: number;
};

export type Products = Product[];

export interface DataError {
  message: string;
}

export type Stock = {
  product_id: string;
  count: number;
};

export type CreateProductBody = {
  title: string;
  description: string;
  price: number;
  count: number;
};

export interface CreateProductEvent extends APIGatewayEvent {
  body: CreateProductBody;
}