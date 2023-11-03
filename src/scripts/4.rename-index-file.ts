import fs from 'fs';
import chalk from 'chalk';

import { fileExists } from '../utils/get-file';

// ----------------------------------------------------------------------

type Props = {
  isTypeScript: boolean;
};

export function renameIndexFile({ isTypeScript }: Props) {
  console.log(
    chalk.blue(
      `🔧 Renaming ${chalk.magenta(
        isTypeScript ? 'main.tsx => index.tsx' : 'main.jsx => index.jsx'
      )}.`
    )
  );

  const isFileExists = fileExists('./src/main.jsx') || fileExists('./src/main.tsx');

  if (!isFileExists) {
    return;
  }

  if (isTypeScript) {
    fs.renameSync('./src/main.tsx', './src/index.tsx');
  } else {
    fs.renameSync('./src/main.jsx', './src/index.jsx');
  }
}
