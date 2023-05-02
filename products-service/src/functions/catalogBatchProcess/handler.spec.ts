import { catalogBatchProcess } from "./handler";
import { productProvider } from "../../provider/product-provider";
import { CreateProductBody } from "../../types/api-types";
import AWSMock from "aws-sdk-mock";
import { SQSEvent } from "aws-lambda";
import { publish } from "./../../helpers/sns";
import AWS from "aws-sdk";

jest.mock("aws-sdk");

describe("catalogBatchProcess", () => {
  const createProductSpy = jest.spyOn(productProvider, "createProduct");

  beforeEach(() => {
    createProductSpy.mockClear();
  });

  afterAll(() => {
    AWSMock.restore();
  });

  it("should process each record in the event", async () => {
    const event = {
      Records: [
        {
          body: JSON.stringify([
            "Product 1",
            "Product 1 description",
            "10.00",
            "100",
          ]),
        },
        {
          body: JSON.stringify([
            "Product 2",
            "Product 2 description",
            "20.00",
            "200",
          ]),
        },
      ],
    };

    await catalogBatchProcess(event as SQSEvent);

    expect(createProductSpy).toHaveBeenCalledTimes(2);
    expect(createProductSpy).toHaveBeenCalledWith({
      title: "Product 1",
      description: "Product 1 description",
      price: 10,
      count: 100,
    } as CreateProductBody);
    expect(createProductSpy).toHaveBeenCalledWith({
      title: "Product 2",
      description: "Product 2 description",
      price: 20,
      count: 200,
    } as CreateProductBody);
  });

  it("createProduct function should return created product id", async () => {
    jest
      .spyOn(productProvider, "createProduct")
      .mockImplementation(() => Promise.resolve("123"));

    const mockProduct = {
      title: "Test Product",
      price: 9.99,
      count: 10,
      description: "A test product",
    };

    const productId = await productProvider.createProduct(mockProduct);

    expect(productId).toBe("123");
    expect(createProductSpy).toHaveBeenCalledTimes(1);
    expect(createProductSpy).toHaveBeenCalledWith({
      title: "Test Product",
      description: "A test product",
      price: 9.99,
      count: 10,
    } as CreateProductBody);
  });
});

describe("catalogBatchProcess calling publish function", () => {
  const snsPublishMock = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({}),
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (AWS.SNS as any).mockImplementation(() => ({
      publish: snsPublishMock,
    }));
    jest
      .spyOn(productProvider, "createProduct")
      .mockImplementation(() => Promise.resolve("123"));
  });

  it("should publish message to SNS", async () => {
    const mockProduct = {
      title: "Test Product",
      price: 9.99,
      count: 10,
      description: "A test product",
    };
    const productId = await productProvider.createProduct(mockProduct);
    await publish({ ...mockProduct, id: productId });

    expect(productId).toBe("123");
    expect(snsPublishMock).toHaveBeenCalledTimes(1);
  });

  it("should handle SNS publish error", async () => {
    const error = new Error("Failed to publish to SNS");
    snsPublishMock.mockReturnValueOnce({
      promise: jest.fn().mockRejectedValue(error),
    });
    const mockProduct = {
      title: "Test Product",
      price: 9.99,
      count: 10,
      description: "A test product",
    };

    const productId = await productProvider.createProduct(mockProduct);

    await expect(publish({ ...mockProduct, id: productId })).rejects.toThrow(
      error
    );
  });
});
