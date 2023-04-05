import { productsList } from "@mocks/productsList";

export const productProvider = {
  getProducts: () => Promise.resolve(productsList),
  getProductById: (id?: string) =>
    Promise.resolve(productsList.find((product) => product.id === id)),
};
