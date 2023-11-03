import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

import { fileExists } from '../utils/get-file';

// ----------------------------------------------------------------------

type Props = {
  isTypeScript: boolean;
};

export function removeUnusedFiles({ isTypeScript }: Props) {
  console.log(chalk.blue('🧹 Removing unused files.'));

  const isFileExists =
    fileExists('./vercel.json') ||
    fileExists('./vite.config.ts') ||
    fileExists('./vite.config.js') ||
    fileExists('./tsconfig.node.json') ||
    fileExists('./src/vite-env.d.ts');

  if (!isFileExists) {
    return;
  }

  if (isTypeScript) {
    fs.rmSync(path.resolve(process.cwd(), './vite.config.ts'));
    fs.rmSync(path.resolve(process.cwd(), './vercel.json'));
    fs.rmSync(path.resolve(process.cwd(), './tsconfig.node.json'));
    fs.rmSync(path.resolve(process.cwd(), './src/vite-env.d.ts'));
  } else {
    fs.rmSync(path.resolve(process.cwd(), './vite.config.js'));
    fs.rmSync(path.resolve(process.cwd(), './vercel.json'));
  }
}
