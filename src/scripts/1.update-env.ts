import fs from 'fs';
import chalk from 'chalk';

import { getFile, fileExists } from '../utils/get-file';

// ----------------------------------------------------------------------

type Props = {
  isTypeScript: boolean;
};

export function updateEnvVariables({ isTypeScript }: Props) {
  const isFileExists = fileExists('./.env');

  if (!isFileExists) {
    return;
  }

  console.log(chalk.blue(`🔑 Updating ${chalk.magenta('.env')}.`));

  // Update .env
  const { _path: envPath, _content: envContent } = getFile('./.env');

  const updatedContent = envContent.replace(/VITE_/g, 'REACT_APP_');

  fs.writeFileSync(envPath, updatedContent);

  console.log(
    chalk.blue(
      `🛠️  Updating ${chalk.magenta(`./src/config-global.${isTypeScript ? 'ts' : 'js'}`)}.`
    )
  );

  // Update variables
  const { _path, _content } = getFile(`./src/config-global.${isTypeScript ? 'ts' : 'js'}`);

  const _updatedContent = _content.replace(/import.meta.env.VITE_/g, 'process.env.REACT_APP_');

  fs.writeFileSync(_path, _updatedContent);
}
