import chalk from 'chalk';
import nodePath from 'path';
import fs from 'fs/promises';

// ----------------------------------------------------------------------

const FILE_CONTENT = `/// <reference types="react-scripts" />`;

export async function generateReactAppEnvFile() {
  const filePath = nodePath.resolve(process.cwd(), './src/react-app-env.d.ts');

  console.log(chalk.blue(`⚡️ Generating ${chalk.magenta('react-app-env.d.ts')}.`));

  try {
    await fs.writeFile(filePath, FILE_CONTENT);
  } catch (error) {
    console.error(chalk.red(`Error writing file: ${error}`));
  }
}
