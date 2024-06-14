import chalk from 'chalk';
import nodePath from 'path';
import fs from 'fs/promises';

import { fileExists } from '../utils/get-file';

import type { SourceType } from '../types';

// ----------------------------------------------------------------------

export async function removeUnusedFiles({ isTypeScript }: SourceType) {
  console.log(chalk.blue('🧹 Removing unused files.'));

  const filesToRemove = isTypeScript
    ? ['./vite.config.ts', './vercel.json', './tsconfig.node.json', './src/vite-env.d.ts']
    : ['./vite.config.js', './vercel.json'];

  // eslint-disable-next-line no-restricted-syntax
  for (const file of filesToRemove) {
    const filePath = nodePath.resolve(process.cwd(), file);

    if (fileExists(filePath)) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await fs.rm(filePath);
      } catch (error) {
        console.error(chalk.red(`Error removing file: ${error}`));
      }
    }
  }
}
