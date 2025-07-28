import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

interface Config {
  root: string;
  typesOutput: string;
  hookOutput: string;
  linkOutput: string;
}

function resolveOutputPath(rawPath: string | undefined, defaultFile: string, defaultDir: string): string {
  if (!rawPath) return path.join(defaultDir, defaultFile);

  const resolved = path.resolve(rawPath);

  const isFile = /\.[tj]sx?$/.test(resolved);
  return isFile ? resolved : path.join(resolved, defaultFile);
}

export function loadConfig(): Config {
  const configPath = path.resolve('.nextroute.config.yml');
  let configRaw: Partial<Config> = {};

  if (fs.existsSync(configPath)) {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    configRaw = (yaml.load(fileContents) as Partial<Config>) || {};
  }

  const projectRoot = process.cwd();
  const defaultDir = path.join(projectRoot, 'routegen-next');

  if (!fs.existsSync(defaultDir)) {
    fs.mkdirSync(defaultDir, { recursive: true });
  }

  const root = configRaw.root || 'src/app';

  const typesOutput = resolveOutputPath(configRaw.typesOutput, 'routes.ts', defaultDir);
  const hookOutput = resolveOutputPath(configRaw.hookOutput, 'useRouter.ts', defaultDir);
  const linkOutput = resolveOutputPath(configRaw.linkOutput, 'Link.tsx', defaultDir);

  [typesOutput, hookOutput, linkOutput].forEach((filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  return { root, typesOutput, hookOutput, linkOutput };
}
