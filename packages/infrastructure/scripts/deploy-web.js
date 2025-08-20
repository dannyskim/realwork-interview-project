#!/usr/bin/env node

import { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command, PutBucketPolicyCommand } from '@aws-sdk/client-s3';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const BUCKET_NAME = process.env.BUCKET_NAME || 'danielk-realwork-interview-webst-webbucket1cccc993-wdxodfcm180g';
const DIST_PATH = resolve(__dirname, '../../web/dist');
const REGION = 'us-east-1';

const s3Client = new S3Client({ region: REGION });

// Set bucket policy for public read access
const setBucketPolicy = async () => {
  console.log('🔒 Setting bucket policy for public read access...');

  const bucketPolicy = {
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "PublicReadGetObject",
        Effect: "Allow",
        Principal: "*",
        Action: "s3:GetObject",
        Resource: `arn:aws:s3:::${BUCKET_NAME}/*`
      }
    ]
  };

  try {
    await s3Client.send(new PutBucketPolicyCommand({
      Bucket: BUCKET_NAME,
      Policy: JSON.stringify(bucketPolicy)
    }));
    console.log('✅ Bucket policy updated for public access');
  } catch (error) {
    console.error('❌ Error setting bucket policy:', error.message);
    throw error;
  }
};

// MIME type mapping
const getMimeType = (filePath) => {
  const ext = filePath.split('.').pop().toLowerCase();
  const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'eot': 'application/vnd.ms-fontobject'
  };
  return mimeTypes[ext] || 'application/octet-stream';
};

// Get all files in directory recursively
const getAllFiles = (dirPath, arrayOfFiles = []) => {
  const files = readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = join(dirPath, file);
    if (statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
};

// Clear existing files in bucket
const clearBucket = async () => {
  console.log('🗑️  Clearing existing files from bucket...');

  try {
    const listParams = {
      Bucket: BUCKET_NAME,
    };

    const listedObjects = await s3Client.send(new ListObjectsV2Command(listParams));

    if (listedObjects.Contents && listedObjects.Contents.length > 0) {
      for (const object of listedObjects.Contents) {
        await s3Client.send(new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: object.Key,
        }));
        console.log(`   Deleted: ${object.Key}`);
      }
    }

    console.log('✅ Bucket cleared successfully');
  } catch (error) {
    console.error('❌ Error clearing bucket:', error.message);
    throw error;
  }
};

// Upload files to S3
const uploadFiles = async () => {
  console.log('📤 Uploading files to S3...');
  console.log(`   Source: ${DIST_PATH}`);
  console.log(`   Bucket: ${BUCKET_NAME}`);

  const files = getAllFiles(DIST_PATH);

  for (const filePath of files) {
    const relativePath = relative(DIST_PATH, filePath);
    const key = relativePath.replace(/\\/g, '/'); // Convert Windows paths to S3 keys

    const fileContent = readFileSync(filePath);
    const mimeType = getMimeType(filePath);

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: key,
      Body: fileContent,
      ContentType: mimeType,
      CacheControl: key === 'index.html' ? 'no-cache' : 'public, max-age=31536000',
    };

    try {
      await s3Client.send(new PutObjectCommand(uploadParams));
      console.log(`   ✅ ${key} (${mimeType})`);
    } catch (error) {
      console.error(`   ❌ Failed to upload ${key}:`, error.message);
      throw error;
    }
  }

  console.log(`\n🎉 Successfully uploaded ${files.length} files!`);
};

// Main deployment function
const deploy = async () => {
  try {
    console.log('🚀 Starting React app deployment to S3...\n');

    // Check if dist directory exists
    try {
      statSync(DIST_PATH);
    } catch (error) {
      console.error('❌ Build output not found. Please run "pnpm build" first.');
      process.exit(1);
    }

    await setBucketPolicy();
    console.log('');
    await clearBucket();
    console.log('');
    await uploadFiles();

    console.log(`\n✨ Deployment completed successfully!`);
    console.log(`🌐 Your app should be available at: https://${BUCKET_NAME}.s3-website.${REGION}.amazonaws.com`);
    console.log(`📊 S3 Console: https://console.aws.amazon.com/s3/buckets/${BUCKET_NAME}`);

  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    process.exit(1);
  }
};

// Run deployment
deploy();
