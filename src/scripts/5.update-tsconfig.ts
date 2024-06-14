import chalk from 'chalk';
import fs from 'fs/promises';

import { fileExists } from '../utils/get-file';

// ----------------------------------------------------------------------

const FILE_CONTENT = `{
  "compilerOptions": {
    "baseUrl": ".",
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "strict": true,
    "noEmit": true,
    "allowJs": true,
    "module": "esnext",
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "strictNullChecks": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "noFallthroughCasesInSwitch": true,
    "useUnknownInCatchVariables": false,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "src/**/*",
  ],
  "exclude": [
    "node_modules"
  ],
}
`;

const FILE_PATH = './tsconfig.json';

// ----------------------------------------------------------------------

export async function updateTSConfigFile() {
  console.log(chalk.blue(`🔖 Updating ${chalk.magenta(FILE_PATH)}.`));

  if (!fileExists(FILE_PATH)) {
    console.log(chalk.red(`File ${FILE_PATH} does not exist.`));
    return;
  }

  try {
    await fs.rm(FILE_PATH);
  } catch (error) {
    console.error(chalk.red(`Error removing file: ${error}`));
    return;
  }

  try {
    await fs.writeFile(FILE_PATH, FILE_CONTENT);
  } catch (error) {
    console.error(chalk.red(`Error writing file: ${error}`));
  }
}
