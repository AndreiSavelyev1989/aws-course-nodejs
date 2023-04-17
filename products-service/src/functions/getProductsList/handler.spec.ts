import { getProductsList } from "./handler";
import { Status } from "@constants/index";
import * as prodProvider from '../../provider/product-provider';
import * as stockProvider from '../../provider/stock-provider';
import { mockEvent, products, productsInStockMock, stocks } from "@mocks/testData";

describe("getProductsList handler", () => {
  it("should get successfully response", async () => {
    jest.spyOn(prodProvider.productProvider, 'getProducts').mockImplementation(() => Promise.resolve(products));
    jest.spyOn(stockProvider.stockProvider, 'getStocks').mockImplementation(() => Promise.resolve(stocks));
    const response = await getProductsList(mockEvent);
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(JSON.stringify(productsInStockMock));
  });
});
