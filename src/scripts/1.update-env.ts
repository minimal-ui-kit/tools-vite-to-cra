import fs from 'fs';
import chalk from 'chalk';
import { promisify } from 'util';

import { getFile, fileExists } from '../utils/get-file';

import type { SourceType } from '../types';

// ----------------------------------------------------------------------

const ENV_FILE_PATH = './.env';

const CONFIG_GLOBAL_PATH = './src/config-global.';

const VITE_PREFIX = 'VITE_';
const REACT_APP_PREFIX = 'REACT_APP_';

// ----------------------------------------------------------------------

function resolvePort({ isTypeScript, isFullVersion }: SourceType) {
  if (isFullVersion) {
    return isTypeScript ? '8080' : '3030';
  }
  return isTypeScript ? '8081' : '3031';
}

export async function updateEnvVariables({ isTypeScript, isFullVersion }: SourceType) {
  try {
    const isFileExists = fileExists(ENV_FILE_PATH);

    if (!isFileExists) {
      return;
    }

    console.log(chalk.blue(`🔑 Updating ${chalk.magenta(ENV_FILE_PATH)}.`));

    // Update .env
    await updateContentInFile(ENV_FILE_PATH, VITE_PREFIX, REACT_APP_PREFIX);

    // Add PORT
    await addContentToTop(resolvePort({ isTypeScript, isFullVersion }));

    const configGlobalPath = `${CONFIG_GLOBAL_PATH}${isTypeScript ? 'ts' : 'js'}`;

    console.log(chalk.blue(`🛠️  Updating ${chalk.magenta(configGlobalPath)}.`));

    // Update config-global file
    await updateContentInFile(
      configGlobalPath,
      `import.meta.env.${VITE_PREFIX}`,
      `process.env.${REACT_APP_PREFIX}`
    );
  } catch (error) {
    console.error(chalk.red('Error during updating environment variables:'), error);
  }
}

// ----------------------------------------------------------------------

async function updateContentInFile(filePath: string, searchValue: string, replaceValue: string) {
  const writeFileAsync = promisify(fs.writeFile);

  const { path, content } = getFile(filePath);

  const updatedContent = content.replace(new RegExp(searchValue, 'g'), replaceValue);

  await writeFileAsync(path, updatedContent);
}

// async function addContentToBottom(port: string) {
//   const appendFileAsync = promisify(fs.appendFile);
//   await appendFileAsync(ENV_FILE_PATH, `\nPORT=${port}`);
// }

async function addContentToTop(port: string) {
  const readFileAsync = promisify(fs.readFile);
  const writeFileAsync = promisify(fs.writeFile);

  const existingContent = await readFileAsync(ENV_FILE_PATH, 'utf8');
  const newContent = `PORT=${port}\n\n${existingContent}`;

  await writeFileAsync(ENV_FILE_PATH, newContent);
}
