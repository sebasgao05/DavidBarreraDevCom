# Setup Guide

## Prerequisites

- **Node.js 22+** - Required runtime
- **pnpm** - Package manager (install via `corepack enable` or visit https://pnpm.io/installation)
- **AWS CLI** - Only needed for manual deployment (optional)

## Development Setup

```bash
# Clone the repository
git clone https://github.com/sebasgao05/DavidBarreraDevCom.git
cd DavidBarreraDevCom

# Install dependencies
pnpm install

# Start development server
pnpm start
```

The dev server runs at `http://localhost:3000` with hot reload enabled.

## Environment Variables

Copy `.env.example` to `.env` and fill in the `REACT_APP_*` values. These are public values embedded in the bundle (name, contact info, image URLs, etc.). Never place secrets in `.env`.

## Production Build

```bash
# Full production build (optimize images + build + performance enhancements)
pnpm run build:prod

# Standard React build only
pnpm build

# Analyze bundle size
pnpm run analyze
```

## Available Scripts

### Core

| Command | Description |
|---------|-------------|
| `pnpm start` | Start development server with hot reload |
| `pnpm build` | Standard React production build |
| `pnpm run build:prod` | Full optimized build (images + build + performance) |
| `pnpm test` | Run tests in watch mode |
| `pnpm run test:ci` | Run tests once (CI mode, no watch) |
| `pnpm run lint` | Run ESLint on `src/` with zero warnings policy |

### Validation and Deployment

| Command | Description |
|---------|-------------|
| `pnpm run validate` | Run build validation checks |
| `pnpm run deploy` | Validate + build:prod + deploy to AWS S3 |
| `pnpm run deploy:optimized` | Validate + build:prod + deploy with optimized cache strategy |

### Asset Generation

| Command | Description |
|---------|-------------|
| `pnpm run setup:assets` | Prepare base assets |
| `pnpm run optimize:images` | Optimize images with sharp |
| `pnpm run generate:icons` | Generate app icons |
| `pnpm run generate:favicon` | Generate favicon |
| `pnpm run generate:responsive` | Generate responsive image variants |
| `pnpm run generate:responsive:enhanced` | Generate enhanced responsive variants |
| `pnpm run generate:screenshots` | Capture screenshots |

### SEO and Performance

| Command | Description |
|---------|-------------|
| `pnpm run seo:check` | Run Lighthouse audit on production URL |
| `pnpm run sitemap:generate` | Generate sitemap.xml |
| `pnpm run perf:audit` | Lighthouse audit on localhost |
| `pnpm run perf:monitor` | Performance monitoring status |

## Project Structure

```
src/
├── components/     # React components
├── contexts/       # React contexts (theme)
├── data/           # Portfolio data
├── hooks/          # Custom hooks
├── i18n/           # Internationalization (ES/EN)
├── styles/         # CSS and Tailwind styles
├── types/          # TypeScript type definitions
└── utils/          # Utility functions

public/             # Static assets served as-is
scripts/            # Build, deploy, and asset scripts
docs/               # Project documentation
.github/            # GitHub Actions workflows, templates, dependabot
```

## Troubleshooting

### `pnpm install` fails

Make sure you are running Node.js 22+ and pnpm 10+:

```bash
node --version   # should be v22.x or higher
pnpm --version   # should be v10.x or higher
```

### Tests fail with missing environment variables

Ensure `.env` exists with the required `REACT_APP_*` values. Tests may reference these variables.

### Build warnings about bundle size

Use `pnpm run analyze` to inspect the bundle and identify large dependencies. The project uses code splitting and lazy loading to keep the initial bundle small.

## Dependency Updates

Las dependencias se revisan automaticamente cada mes. Dependabot crea un solo PR agrupado con todas las actualizaciones. No necesitas actualizar manualmente a menos que quieras adelantar un upgrade especifico.
