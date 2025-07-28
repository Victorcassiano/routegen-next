#!/usr/bin/env bun
import { generateRoutes, generateHook, generateLink } from './generator';
import { createRoute } from '@/createRoute';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const command = args[0];

function initConfig() {
  const ymlPath = path.resolve('.nextroute.config.yml');
  if (!fs.existsSync(ymlPath)) {
    const defaultConfig = `appDirectory: src/app\n`;
    fs.writeFileSync(ymlPath, defaultConfig);
    console.log('✅ Criado .nextroute.config.yml');
  }
}

async function main() {
  if (!command) {
    console.error('❌ Command not provided. Use `routegen-next /route` or `routegen-next init`');
    process.exit(1);
  }

  if (command === 'init') {
    initConfig();
    await generateHook();
    await generateLink();
  } else {
    createRoute(command);
  }

  await generateRoutes();
}

main();
