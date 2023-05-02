import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { S3Event } from "aws-lambda";
import { parse } from "csv-parse";
import { SQSClient } from "@aws-sdk/client-sqs";
import { SendMessageCommand } from "@aws-sdk/client-sqs";

const importFileParser = async (event: S3Event) => {
  const REGION = "us-east-1";
  const client = new S3Client({ region: REGION });
  const sqs = new SQSClient({ region: REGION });

  const { Records } = event;
  const {
    bucket: { name: bucketName },
    object: { key },
  } = Records[0].s3;

  const commandGet = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const response = await client.send(commandGet);

  const stream = await response.Body.transformToByteArray();
  const parser = parse();

  parser.on("readable", async () => {
    let record;
    while ((record = parser.read()) !== null) {
      if (
        !record.includes("description") &&
        !record.includes("title") &&
        !record.includes("price") &&
        !record.includes("count")
      ) {
        const params = {
          MessageBody: JSON.stringify(record),
          QueueUrl: process.env.SQS_URL,
        };
        await sqs.send(new SendMessageCommand(params));
      }
    }
  });

  parser.on("error", (err) => {
    console.log("Parsing error", err);
  });

  parser.on("end", () => {
    console.log(`Parsing finished successfully`);
  });

  parser.write(stream);
  parser.end();

  const commandCopy = new CopyObjectCommand({
    CopySource: `${bucketName}/${key}`,
    Bucket: bucketName,
    Key: key.replace("uploaded", "parsed"),
  });

  await client.send(commandCopy);

  const commandDelete = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  await client.send(commandDelete);
};

export const main = importFileParser;
