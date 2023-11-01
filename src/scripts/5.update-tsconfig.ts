import fs from 'fs';
import chalk from 'chalk';
import { getFile } from '../utils/get-file';

// ----------------------------------------------------------------------

const template = () => `{
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
    "forceConsistentCasingInFileNames": true
  },
  "exclude": [
    "node_modules"
  ],
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "src/**/*"
  ],
}
`;

export function updateTSConfigFile(compile: 'TypeScript' | 'JavaScript') {
  console.log(
    chalk.blue('5.Updating'),
    chalk.magenta(compile === 'TypeScript' ? 'tsconfig.json' : '-')
  );

  if (compile === 'TypeScript') {
    const { _path } = getFile('./tsconfig.json');

    fs.rmSync(_path);
    fs.writeFileSync(_path, template());
  }
}
