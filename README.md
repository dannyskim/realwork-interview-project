# RealWork Interview Assignment

A TypeScript React application solving two algorithmic challenges, deployed using SST v2 to AWS.

## Problems Solved

### Problem 1: Unused Letters
Find all letters of the alphabet that are not used in a given string of English text.

### Problem 2: Particle Chamber
Simulate particles moving through a chamber at constant speed until they all exit.

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Infrastructure**: SST v2 (AWS CDK)
- **Deployment**: S3 + CloudFront
- **Package Manager**: pnpm workspace

## Project Structure

```
packages/
├── web/                 # React application
│   ├── src/
│   │   ├── components/  # UI components (shadcn/ui)
│   │   ├── lib/         # Algorithm implementations
│   │   ├── pages/       # Application pages
│   │   └── main.tsx     # Application entry point
│   └── dist/           # Build output
└── infrastructure/      # SST v2 configuration
    ├── stacks/         # CDK stacks
    └── sst.config.ts   # SST configuration
```

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 8+
- AWS CLI configured

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Build the application:
```bash
pnpm build
```

### Deployment

The project uses a hybrid deployment approach:
1. **Infrastructure**: SST v2 creates S3 bucket and configures website hosting
2. **Assets**: Custom script uploads React build files directly to S3

#### Option 1: Complete Deployment (Recommended)
```bash
pnpm deploy
```
This will:
- Build the React application
- Deploy SST infrastructure (S3 bucket)
- Upload React assets to S3

#### Option 2: Manual Steps
1. Deploy infrastructure:
```bash
pnpm -F @realwork/infrastructure run deploy
```

2. Deploy web assets:
```bash
pnpm -F @realwork/infrastructure run deploy-web
```

#### Option 3: Infrastructure Only
```bash
pnpm -F @realwork/infrastructure run deploy
```

### Deployment Architecture

The application uses a custom deployment approach that avoids CloudFormation for asset deployment:

- **S3 Bucket**: Created via SST v2 with website hosting enabled
- **Asset Upload**: Direct S3 upload using AWS SDK
- **No CloudFront**: Simple S3 website hosting for this demo

The deployment script automatically:
- Detects the bucket name from SST outputs
- Clears existing files from the bucket
- Uploads new build files with appropriate MIME types

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **SST v2** - Infrastructure as Code
- **AWS S3** - Static hosting
- **AWS CloudFront** - CDN

## Development

The project uses a monorepo structure with pnpm workspaces. Each package can be developed independently:

```bash
# Work on web app
cd packages/web
pnpm dev

# Work on infrastructure
cd packages/infrastructure
pnpm dev
```
