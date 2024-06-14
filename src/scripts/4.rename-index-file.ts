import chalk from 'chalk';
import fs from 'fs/promises';

import { fileExists } from '../utils/get-file';

import type { SourceType } from '../types';

// ----------------------------------------------------------------------

export async function renameIndexFile({ isTypeScript }: SourceType) {
  const fileExtension = isTypeScript ? 'tsx' : 'jsx';
  const oldFilePath = `./src/main.${fileExtension}`;
  const newFilePath = `./src/index.${fileExtension}`;

  console.log(chalk.blue(`🔧 Renaming ${chalk.magenta(`${oldFilePath} => ${newFilePath}`)}.`));

  if (!fileExists(oldFilePath)) {
    return;
  }

  try {
    await fs.rename(oldFilePath, newFilePath);
  } catch (error) {
    console.error(chalk.red(`Error renaming file: ${error}`));
  }
}
