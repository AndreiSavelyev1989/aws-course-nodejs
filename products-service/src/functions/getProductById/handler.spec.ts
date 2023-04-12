import { getProductById } from "./handler";
import { ErrorMessage, Status } from "@constants/index";
import * as prodProvider from "../../provider/product-provider";
import * as stockProvider from "../../provider/stock-provider";
import { mockEvent, productsInStockMock, stocks } from "@mocks/testData";

describe("getProductsById handler", () => {
  it("should get successfully response", async () => {
    const productId = "7567ec4b-b10c-48c5-9345-fc73c48a80aa";
    jest
      .spyOn(prodProvider.productProvider, "getProductById")
      .mockImplementation(() => Promise.resolve(productsInStockMock[0]));
    jest
      .spyOn(stockProvider.stockProvider, "getStockByProductId")
      .mockImplementation(() => Promise.resolve(stocks[0]));
    const event = {
      ...mockEvent,
      pathParameters: {
        id: productId,
      },
    };
    const { body, statusCode } = await getProductById(event);

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(JSON.stringify(productsInStockMock[0]));
  });

  it("should receive 404 error", async () => {
    jest
      .spyOn(prodProvider.productProvider, "getProductById")
      .mockImplementation(() => Promise.resolve(productsInStockMock[1]));
    jest
      .spyOn(stockProvider.stockProvider, "getStockByProductId")
      .mockImplementation(() => Promise.resolve(stocks[1]));
    const currentEvent = {
      ...mockEvent,
      pathParameters: {
        productId: "1",
      },
    };
    const { body, statusCode } = await getProductById(currentEvent);

    expect(statusCode).toBe(Status.Error404);
    expect(body).toEqual(
      JSON.stringify({
        message: `Product ${ErrorMessage.NotFound}`,
      })
    );
  });
});
