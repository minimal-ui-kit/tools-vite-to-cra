import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// ----------------------------------------------------------------------

export function clearnFiles(compile: 'TypeScript' | 'JavaScript') {
  console.log(chalk.blue('7.Clearn files'));

  if (compile === 'TypeScript') {
    fs.rmSync(path.resolve(process.cwd(), './tsconfig.node.json'));
    fs.rmSync(path.resolve(process.cwd(), './vite.config.ts'));
    fs.rmSync(path.resolve(process.cwd(), './src/vite-env.d.ts'));
  } else {
    fs.rmSync(path.resolve(process.cwd(), './vite.config.js'));
    fs.rmSync(path.resolve(process.cwd(), './vercel.json'));
  }
}
