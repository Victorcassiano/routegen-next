import { loadConfig } from '@/config';
import fs from 'node:fs';
import path from 'node:path';

function normalizeRoute(route: string) {
  return route.replace(/^\//, '').split('/');
}

export function createRoute(routePath: string) {
  const config = loadConfig();
  const normalizedParts = normalizeRoute(routePath);
  const fullPath = path.join(config.root, ...normalizedParts);
  fs.mkdirSync(fullPath, { recursive: true });
  const pageFile = path.join(fullPath, 'page.tsx');
  if (!fs.existsSync(pageFile)) {
    fs.writeFileSync(pageFile, ``);
  }
  console.log(`✅ Created directory and page.tsx: ${fullPath}`);
}
