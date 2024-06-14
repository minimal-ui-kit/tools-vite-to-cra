import chalk from 'chalk';

import { checkSource } from './utils/check-source';
import { updateEnvVariables } from './scripts/1.update-env';
import { executeSyncCommand } from './utils/execute-command';
import { updateHtmlFile } from './scripts/3.update-html-file';
import { renameIndexFile } from './scripts/4.rename-index-file';
import { updateTSConfigFile } from './scripts/5.update-tsconfig';
import { removeUnusedFiles } from './scripts/8.remove-unused-files';
import { updatePackageJSON } from './scripts/2.update-package-json';
import { installDependencies } from './scripts/9.install-dependencies';
import { generateCracoConfigFile } from './scripts/7.generate-craco-config';
import { generateReactAppEnvFile } from './scripts/6.generate-react-app-env';

// ----------------------------------------------------------------------

export async function migrateViteToCRA() {
  try {
    const { isTypeScript, isFullVersion } = checkSource();

    console.log(chalk.green.bold('\n🎬 Starting Migration Vite.js to CRA'));
    console.log(chalk.yellow.bold("Don't terminate this session until the process is complete.\n"));

    // 1. Update .env
    await updateEnvVariables({ isTypeScript, isFullVersion });

    // 2. Update package.json
    await updatePackageJSON();

    // 3. Update index.html
    await updateHtmlFile();

    // 4. Rename index file
    await renameIndexFile({ isTypeScript });

    if (isTypeScript) {
      // 5. Update tsconfig.json
      await updateTSConfigFile();

      // 6. Generate react-app-env.d.ts
      await generateReactAppEnvFile();
    }

    // 7. Generate craco.config.js
    await generateCracoConfigFile();

    // 8. Remove unused files
    await removeUnusedFiles({ isTypeScript });

    // 9. Refactor dependencies
    await installDependencies();

    console.log(chalk.green.bold(`\n🎉 Migration to CRA is completed!\n`));

    // 10. Run the application
    await executeSyncCommand('npm start', '⚙️  Starting the application.');
  } catch (error) {
    console.error(chalk.red('Error during migration:'), error);
  }
}
