import fs from 'fs';
import chalk from 'chalk';

import { getFile } from '../utils/get-file';

// ----------------------------------------------------------------------

const UPDATE_SCRIPTS = {
  start: 'react-scripts start',
  build: 'react-scripts build',
  eject: 'react-scripts eject',
  lint: 'eslint "src/**/*.{js,jsx,ts,tsx}"',
  'lint:fix': 'eslint --fix "src/**/*.{js,jsx,ts,tsx}"',
  prettier: 'prettier --write "src/**/*.{js,jsx,ts,tsx}"',
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

export function updatePackageJSON() {
  console.log(chalk.blue(`📦 Updating ${chalk.magenta('package.json')}.`));

  const { _path, _content } = getFile('./package.json');

  let packageJSON = JSON.parse(_content);

  delete packageJSON.type;

  packageJSON.name = packageJSON.name.replace('vite', 'cra');
  packageJSON.description = packageJSON.description.replace('Vite', 'Cra');
  packageJSON.scripts = UPDATE_SCRIPTS;

  packageJSON = Object.assign(packageJSON, NEW_ATTRIBUTE);

  fs.writeFileSync(_path, JSON.stringify(packageJSON, null, 2));
}
