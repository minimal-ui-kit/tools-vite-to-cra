import fs from 'fs';
import chalk from 'chalk';

// ----------------------------------------------------------------------

export function renameIndexFile(compile: 'TypeScript' | 'JavaScript') {
  console.log(
    chalk.blue('6.Renaming'),
    chalk.magenta(compile === 'TypeScript' ? 'main.tsx => index.tsx' : 'main.jsx => index.jsx')
  );

  if (compile === 'TypeScript') {
    fs.renameSync('./src/main.tsx', './src/index.tsx');
  } else {
    fs.renameSync('./src/main.jsx', './src/index.jsx');
  }
}
