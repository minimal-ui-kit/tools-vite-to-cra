import chalk from 'chalk';
import receiveCLIArgs from './cli';
import { clearnFiles } from './scripts/7.clearn-files';
import { updateHtmlFile } from './scripts/3.update-html-file';
import { renameIndexFile } from './scripts/6.rename-index-file';
import { updateTSConfigFile } from './scripts/5.update-tsconfig';
import { updatePackageJSON } from './scripts/4.update-package-json';
import { installDependencies } from './scripts/8.install-dependencies';
import { updateEnvVariables } from './scripts/1.update-env';
import { generateReactAppEnvFile } from './scripts/2.generate-react-app-env-file';

// ----------------------------------------------------------------------

export async function migrateViteToCRA() {
  const { compile } = await receiveCLIArgs();

  console.log(chalk.green.bold('Starting Migration to CRA'));

  console.log(chalk.yellow.bold("Don't terminate this session until the process is complete."));

  await updateEnvVariables();

  generateReactAppEnvFile(compile);

  // Update
  updateHtmlFile();
  updatePackageJSON();
  updateTSConfigFile(compile);

  // Rename
  renameIndexFile(compile);

  // Clearn
  clearnFiles(compile);

  // Install
  installDependencies(compile);

  console.log(chalk.green.bold('Migration to CRA is completed!'));
}
