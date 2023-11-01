import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// ----------------------------------------------------------------------

const template = () => `/// <reference types="react-scripts" />`;

export function generateReactAppEnvFile(compile: 'TypeScript' | 'JavaScript') {
  console.log(
    chalk.blue('2.Generating'),
    chalk.magenta(compile === 'TypeScript' ? 'react-app-env.d.ts' : '-')
  );

  if (compile === 'TypeScript') {
    fs.writeFileSync(path.resolve(process.cwd(), './src/react-app-env.d.ts'), template());
  }
}
