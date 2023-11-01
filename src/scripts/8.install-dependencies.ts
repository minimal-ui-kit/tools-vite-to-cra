import chalk from 'chalk';
import { execSync } from 'child_process';

// ----------------------------------------------------------------------

export function installDependencies(compile: 'TypeScript' | 'JavaScript') {
  console.log(chalk.blue('8.Installing dependencies'));

  const DEV_DEPENDENCIES =
    compile === 'TypeScript'
      ? ['@babel/plugin-proposal-private-property-in-object@7.21.11']
      : [
          '@babel/plugin-proposal-private-property-in-object@7.21.11',
          'eslint-plugin-unused-imports@2.0.0',
        ];

  const DEPENDENCIES = [
    'react-scripts@5.0.1',
    'stylis-plugin-rtl@2.0.2',
    'worker-loader@3.0.8',
    'react-markdown@8.0.7',
    'rehype-highlight@6.0.0',
    'rehype-raw@6.1.1',
    'remark-gfm@3.0.1',
  ];

  if (DEV_DEPENDENCIES.length) {
    execSync(`npm install -D ${DEV_DEPENDENCIES.join(' ')}`, {
      stdio: 'inherit',
    });
  }

  if (DEPENDENCIES.length) {
    execSync(`npm install ${DEPENDENCIES.join(' ')}`, {
      stdio: 'inherit',
    });
  }
}
