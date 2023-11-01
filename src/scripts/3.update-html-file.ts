import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { getFile } from '../utils/get-file';
import { multiReplace } from '../utils/multi-replace';

// ----------------------------------------------------------------------

const REPLACEMENTS = {
  '/manifest.json': '%PUBLIC_URL%/manifest.json',
  '/favicon/favicon.ico': '%PUBLIC_URL%/favicon/favicon.ico',
  '/favicon/favicon-16x16.png': '%PUBLIC_URL%/favicon/favicon-16x16.png',
  '/favicon/favicon-32x32.png': '%PUBLIC_URL%/favicon/favicon-32x32.png',
  '/favicon/apple-touch-icon.png': '%PUBLIC_URL%/favicon/apple-touch-icon.png',
  [`<script type="module" src="/src/main.tsx"></script>`]: '',
  [`<script type="module" src="/src/main.jsx"></script>`]: '',
  [`<script>`]: '',
  [`const global = globalThis;`]: '',
  [`</script>`]: '',
};

// ----------------------------------------------------------------------

export function updateHtmlFile() {
  console.log(chalk.blue('3.Updating'), chalk.magenta('index.html'));

  const { _path, _content } = getFile('./index.html');

  // Updated
  const updatedContent = multiReplace(_content, REPLACEMENTS);

  fs.writeFileSync(_path, updatedContent);

  // Copy to public folder
  fs.copyFileSync(
    path.resolve(process.cwd(), './index.html'),
    path.resolve(process.cwd(), './public/index.html')
  );

  // Remove in root
  fs.rmSync(_path);
}
