import { productProvider } from "../../provider/product-provider";
import { publish } from "src/helpers/sns";
import { CreateProductBody } from "src/types/api-types";
import type { SQSEvent } from "aws-lambda";

export const catalogBatchProcess = async (event: SQSEvent): Promise<void> => {
  console.log("catalogBatchProcess called with event data: ", event.Records);

  for (const record of event.Records) {
    const recordBody = JSON.parse(record.body);
    console.log("processing record ", recordBody);

    const product = {
      title: recordBody[0],
      description: recordBody[1],
      price: Number(recordBody[2]),
      count: Number(recordBody[3]),
    } as CreateProductBody;

    try {
      const id = await productProvider.createProduct(product);
      await publish({ ...product, id: id });
      console.log("Product successfully created: ", { ...product, id });
    } catch (e) {
      console.log(
        `Failed to create product ${JSON.stringify(recordBody)} with error ${e}`
      );
    }
  }
};
