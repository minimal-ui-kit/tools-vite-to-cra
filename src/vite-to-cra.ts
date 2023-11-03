import chalk from 'chalk';

import { checkSource } from './utils/check-source';
import { updateEnvVariables } from './scripts/1.update-env';
import { updateHtmlFile } from './scripts/3.update-html-file';
import { renameIndexFile } from './scripts/4.rename-index-file';
import { updateTSConfigFile } from './scripts/5.update-tsconfig';
import { removeUnusedFiles } from './scripts/8.remove-unused-files';
import { updatePackageJSON } from './scripts/2.update-package-json';
import { updateMapComponent } from './scripts/7.update-map-component';
import { refactorDependencies } from './scripts/9.refactor-dependencies';
import { generateReactAppEnvFile } from './scripts/6.generate-react-app-env-file';

// ----------------------------------------------------------------------

export async function migrateViteToCRA() {
  const { isTypeScript, isFullVersion, kitName } = checkSource();

  console.log(chalk.green.bold('\n🎬 Starting Migration to CRA'));

  console.log(chalk.yellow.bold("Don't terminate this session until the process is complete.\n"));

  // 1.
  updateEnvVariables({ isTypeScript });

  // 2.
  updatePackageJSON();

  // 3.
  updateHtmlFile();

  // 4.
  renameIndexFile({ isTypeScript });

  // 5.
  if (isTypeScript) {
    updateTSConfigFile();
  }

  // 6.
  if (isTypeScript) {
    generateReactAppEnvFile();
  }

  // 7.
  if (kitName === 'Minimal' && isFullVersion) {
    updateMapComponent({ isTypeScript });
  }

  // 8.
  removeUnusedFiles({ isTypeScript });

  // 9.
  refactorDependencies({ isTypeScript, isFullVersion, kitName });

  console.log(chalk.green.bold(`\n🎉 Migration to CRA is completed!\n`));
}
