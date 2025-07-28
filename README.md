
# routegen-next

Automatically generate typed routes for Next.js projects!

## Overview

`routegen-next` is a CLI tool for Next.js projects that automates the generation of typed routes, hooks, and Link components, making navigation safer and more productive in your Next.js apps.

## Features
- **Automatic route type generation**: Scans your pages directory and generates a file with all available routes.
- **Typed navigation hook**: Creates a `useRouter` hook that only accepts valid routes.
- **Typed Link component**: Generates a `Link` component that only accepts valid routes as destination.
- **CLI for route creation**: Quickly create route directories via command.
- **Customizable YAML config**: Personalize output directories and files.

## Installation

You can install the package via npm, bun, or yarn:

```sh
# npm
npm install routegen-next

# bun
bun add routegen-next

# yarn
yarn add routegen-next
```

## Usage

### Initialization
Create the config file and generate the typed files:
```sh
bun run routegen-next init
```

### Generate routes after creating/updating pages
```sh
bun run routegen-next
```

### Create a new route
```sh
bun run routegen-next /my-route
```

## Configuration
The `.nextroute.config.yml` file allows customization:
- `root`: Root directory for pages (default: `src/app`)
- `typesOutput`: Path for the route types file
- `hookOutput`: Path for the typed hook
- `linkOutput`: Path for the typed Link component

## Scripts
- `dev`: Build in watch mode
- `build`: Production build

## Example Usage
```ts
import { useRouter } from './routegen-next/useRouter';
import { Link } from './routegen-next/Link';

const router = useRouter();
router.push('/dashboard'); // Typed!

<Link href="/dashboard">Go to Dashboard</Link>
```
