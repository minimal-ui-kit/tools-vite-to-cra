import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

// ----------------------------------------------------------------------

const template = `/// <reference types="react-scripts" />`;

export function generateReactAppEnvFile() {
  console.log(chalk.blue(`⚡️ Generating ${chalk.magenta('react-app-env.d.ts')}.`));

  fs.writeFileSync(path.resolve(process.cwd(), './src/react-app-env.d.ts'), template);
}
