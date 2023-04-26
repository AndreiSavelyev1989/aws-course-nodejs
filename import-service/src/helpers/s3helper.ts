import AWS from "aws-sdk";

const BUCKET = "aws-shop-course-import";
const EXPIRATION_TIME = 120;
const REGION = "us-east-1";

const s3 = new AWS.S3({ region: REGION });

export const getSignedUrl = (name) => {
  const params = {
    Bucket: BUCKET,
    Key: `uploaded/${name}`,
    Expires: EXPIRATION_TIME,
    ContentType: "text/csv",
  };

  return s3.getSignedUrl("putObject", params);
};
