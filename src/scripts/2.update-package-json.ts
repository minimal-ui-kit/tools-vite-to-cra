import fs from 'fs';
import chalk from 'chalk';
import { promisify } from 'util';

import { getFile } from '../utils/get-file';

// ----------------------------------------------------------------------

const UPDATE_SCRIPTS = {
  start: 'craco start',
  build: 'craco build',
  lint: 'eslint "src/**/*.{js,jsx,ts,tsx}"',
  'lint:fix': 'eslint --fix "src/**/*.{js,jsx,ts,tsx}"',
  'fm:check': 'prettier --check "src/**/*.{js,jsx,ts,tsx}"',
  'fm:fix': 'prettier --write "src/**/*.{js,jsx,ts,tsx}"',
  'rm:all': 'rm -rf node_modules .next out dist build',
  're:start': 'yarn rm:all && yarn install && yarn dev',
  're:build': 'yarn rm:all && yarn install && yarn build',
  're:build-npm': 'npm run rm:all && npm install && npm run build',
};

const NEW_ATTRIBUTE = {
  eslintConfig: {
    extends: ['react-app'],
  },
  browserslist: {
    production: ['>0.2%', 'not dead', 'not op_mini all'],
    development: ['last 1 chrome version', 'last 1 firefox version', 'last 1 safari version'],
  },
  overrides: {
    'nth-check': '2.1.1',
    'react-scripts': {
      typescript: '^5',
    },
  },
};

// ----------------------------------------------------------------------

const writeFileAsync = promisify(fs.writeFile);

export async function updatePackageJSON() {
  try {
    console.log(chalk.blue(`📦 Updating ${chalk.magenta('package.json')}.`));

    const { path: packageJsonPath, content: packageJsonContent } = getFile('./package.json');

    const packageJSON = JSON.parse(packageJsonContent);

    delete packageJSON.type;

    packageJSON.name = packageJSON.name.replace('vite', 'cra');
    packageJSON.description = packageJSON.description.replace('Vite', 'Cra');
    packageJSON.scripts = UPDATE_SCRIPTS;

    Object.assign(packageJSON, NEW_ATTRIBUTE);

    await writeFileAsync(packageJsonPath, JSON.stringify(packageJSON, null, 2));
  } catch (error) {
    console.error(chalk.red('Error during updating package.json:'), error);
  }
}
