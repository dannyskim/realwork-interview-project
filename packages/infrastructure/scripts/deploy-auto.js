#!/usr/bin/env node

import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getBucketFromOutputs = () => {
  try {
    // Get SST outputs
    const output = execSync('pnpm sst list', {
      cwd: dirname(__dirname),
      encoding: 'utf-8'
    });

    // Parse the output to find bucket name
    const lines = output.split('\n');
    const bucketLine = lines.find(line => line.includes('BucketName'));

    if (bucketLine) {
      // Extract bucket name from the output
      const bucketName = bucketLine.split(':')[1]?.trim();
      return bucketName;
    }

    throw new Error('Could not find BucketName in SST outputs');
  } catch (error) {
    console.error('❌ Error getting bucket name from SST outputs:', error.message);
    console.log('💡 Using fallback bucket name from environment variable or default');
    return null;
  }
};

// Set bucket name from SST outputs
const bucketName = getBucketFromOutputs();
if (bucketName) {
  process.env.BUCKET_NAME = bucketName;
  console.log(`📦 Using bucket: ${bucketName}`);
}

// Import and run the deployment script
await import('./deploy-web.js');
