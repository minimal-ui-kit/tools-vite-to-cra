import chalk from 'chalk';
import nodePath from 'path';
import fs from 'fs/promises';

// ----------------------------------------------------------------------

const FILE_CONTENT = `
module.exports = {
  webpack: {
    configure: {
      ignoreWarnings: [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          );
        },
      ],
    },
  },
};
`;

export async function generateCracoConfigFile() {
  const cracoFilePath = nodePath.resolve(process.cwd(), './craco.config.js');

  console.log(chalk.blue(`⚡️ Generating ${chalk.magenta('craco.config.js')}.`));

  try {
    await fs.writeFile(cracoFilePath, FILE_CONTENT);
  } catch (error) {
    console.error(chalk.red(`Error writing file: ${error}`));
  }
}
