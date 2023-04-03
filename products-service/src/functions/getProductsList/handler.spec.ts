import { getProductsList } from "./handler";
import { productsList } from "@mocks/productsList";
import { Status } from "@constants/index";

describe("getProductsList handler", () => {
  it("should get successfully response", async () => {
    const response = await getProductsList();
    const { body, statusCode } = response;

    expect(statusCode).toBe(Status.Success);
    expect(body).toEqual(JSON.stringify(productsList));
  });
});
