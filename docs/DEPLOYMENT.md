# Deployment

## Overview

Deployment is fully automated via GitHub Actions. Pushing to the `main` branch triggers the complete CI/CD pipeline. No manual steps are required for production releases.

**Production URL:** https://david-barrera.com

## CI/CD Pipeline

The workflow (`.github/workflows/deploy.yml`) runs four sequential jobs on every push to `main`:

```
push to main -> lint -> test -> build -> deploy
```

### 1. Lint

- Installs dependencies with `pnpm install --frozen-lockfile`
- Runs `pnpm run lint` (ESLint with zero warnings policy)
- Fails the pipeline if any lint errors or warnings exist

### 2. Test

- Runs `pnpm test -- --coverage --watchAll=false --passWithNoTests`
- Executes all unit tests with coverage reporting
- Depends on lint passing first

### 3. Build

- Runs `pnpm build` with all `REACT_APP_*` environment variables injected
- Produces the production bundle in `build/`
- Uploads the `build/` directory as an artifact for the deploy step
- Depends on test passing first

### 4. Deploy

- Downloads the build artifact
- Configures AWS credentials from repository secrets
- Syncs build output to S3 with cache headers
- Invalidates CloudFront cache
- Depends on build passing first

## S3 Cache Strategy

Files are deployed to S3 with differentiated cache headers based on content type:

| Path Pattern | Cache-Control | Rationale |
|---|---|---|
| `static/` | `public, max-age=31536000, immutable` | Files have content hashes in filenames; safe to cache for 1 year |
| `images/`, `icons/` | `public, max-age=604800` | Media assets rarely change; cached for 1 week |
| Other files | `public, max-age=3600` | General files; cached for 1 hour |
| `index.html`, `manifest.json` | `public, max-age=0, must-revalidate` | Entry points must always be fresh to pick up new deployments |

This strategy ensures users always get the latest HTML while benefiting from long-term caching for hashed static assets.

## CloudFront Invalidation

After every deployment, a full invalidation is triggered:

```
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
```

The `/*` path invalidates all cached objects. This ensures CloudFront edge caches serve the updated content immediately after deploy.

## Required Secrets

The following secrets must be configured in the GitHub repository settings (Settings > Secrets and variables > Actions):

| Secret | Description |
|--------|-------------|
| `AWS_ACCESS_KEY_ID` | IAM access key with S3 and CloudFront permissions |
| `AWS_SECRET_ACCESS_KEY` | IAM secret key paired with the access key |
| `DEPLOY_BUCKET_NAME` | Name of the S3 bucket hosting the site |
| `DEPLOY_DISTRIBUTION_ID` | CloudFront distribution ID to invalidate |

### IAM Permissions Required

The IAM user/role needs these permissions:

- `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` on the deploy bucket
- `cloudfront:CreateInvalidation` on the distribution

## Concurrency

The workflow uses concurrency control:

```yaml
concurrency:
  group: deploy-${{ github.ref }}
  cancel-in-progress: true
```

If a new push arrives while a deploy is running, the in-progress run is cancelled and the new one takes over. This prevents stale deployments from overwriting newer code.

## Manual Deployment (Local)

For local deployment (not recommended for production), you can run:

```bash
# Full pipeline: validate + optimized build + deploy
pnpm run deploy

# Or with optimized cache headers
pnpm run deploy:optimized
```

This requires AWS CLI configured locally and the environment variables `DEPLOY_BUCKET_NAME` and `DEPLOY_DISTRIBUTION_ID` exported in your shell.

## Rollback

To roll back to a previous version:

1. Find the commit hash of the last known good state
2. Create a revert commit or reset `main` to that commit
3. Push to `main` to trigger a new deployment

There is no separate rollback mechanism; the pipeline always deploys whatever is on `main`.
