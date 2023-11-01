import fs from 'fs';
import recursive from 'recursive-readdir';
import chalk from 'chalk';
import { getFile } from '../utils/get-file';

// ----------------------------------------------------------------------

export async function updateEnvVariables() {
  console.log(chalk.blue('1.Updating environment variables'));

  // Update .env
  const { _path: envPath, _content: envContent } = getFile('./.env');

  const updatedContent = envContent.replace(/VITE_/g, 'REACT_APP_');

  fs.writeFileSync(envPath, updatedContent);

  // Update variables
  const files = await recursive('./');

  files.forEach((file) => {
    const isNotJSFile = !file.includes('.ts') && !file.includes('.js');

    const isDirectory = fs.statSync(file).isDirectory();

    if (isDirectory || isNotJSFile) return;

    let content = fs.readFileSync(file, 'utf-8');

    content = content.replace(/import.meta.env.VITE_/g, 'process.env.REACT_APP_');

    content = content.replace(/import.meta.env.MODE/g, 'process.env.NODE_ENV');

    fs.writeFileSync(file, content);
  });
}
