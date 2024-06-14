import chalk from 'chalk';
import nodePath from 'path';
import fs from 'fs/promises';

import { getFile, fileExists } from '../utils/get-file';

// ----------------------------------------------------------------------

const FILE_CONTENT = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="theme-color" content="#000000" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minimal UI Kit</title>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
`;

const INDEX_HTML = './index.html';
const PUBLIC_INDEX_HTML = './public/index.html';

// ----------------------------------------------------------------------

export async function updateHtmlFile() {
  try {
    console.log(
      chalk.blue(`📄 Moving & updating ${chalk.magenta('index.html')} to public folder.`)
    );

    const isFileExists = fileExists(INDEX_HTML);

    if (isFileExists) {
      const { path: filePath } = getFile(INDEX_HTML);
      // Remove in root
      await fs.rm(filePath);
    }

    // Write to public folder
    const newPath = nodePath.join(process.cwd(), PUBLIC_INDEX_HTML);
    await fs.writeFile(newPath, FILE_CONTENT);
  } catch (error) {
    console.error(chalk.red('Error updating HTML file:'), error);
  }
}
