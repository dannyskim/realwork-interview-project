import { StackContext, Bucket } from "sst/constructs";

export function WebStack({ stack }: StackContext) {
  // Create S3 bucket for hosting with public access
  const bucket = new Bucket(stack, "WebBucket", {
    cors: [
      {
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
        allowedOrigins: ["*"],
      },
    ],
    cdk: {
      bucket: {
        websiteIndexDocument: "index.html",
        websiteErrorDocument: "index.html",
        publicReadAccess: true,
        blockPublicAccess: {
          blockPublicAcls: false,
          blockPublicPolicy: false,
          ignorePublicAcls: false,
          restrictPublicBuckets: false,
        },
      },
    },
  });

  const websiteUrl = `https://${bucket.bucketName}.s3-website.${stack.region}.amazonaws.com`;

  stack.addOutputs({
    BucketName: bucket.bucketName,
    BucketArn: bucket.bucketArn,
    WebsiteURL: websiteUrl,
  });

  return {
    bucket,
  };
}
