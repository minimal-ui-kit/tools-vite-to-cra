import chalk from 'chalk';
import { execSync } from 'child_process';

// ----------------------------------------------------------------------

type Props = {
  isTypeScript: boolean;
  isFullVersion: boolean;
  kitName: 'Minimal' | 'Zone';
};

export function refactorDependencies({ isTypeScript, isFullVersion, kitName }: Props) {
  const INSTALL_DEV_DEPENDENCIES = isTypeScript
    ? ['@babel/plugin-proposal-private-property-in-object@latest']
    : [
        '@babel/plugin-proposal-private-property-in-object@latest',
        'eslint-plugin-unused-imports@2.0.0',
      ];

  const INSTALL_DEPENDENCIES =
    kitName === 'Minimal' && isFullVersion
      ? [
          'react-scripts@5.0.1',
          'stylis-plugin-rtl@2.0.2',
          'worker-loader@3.0.8',
          'react-markdown@8.0.7',
          'rehype-highlight@6.0.0',
          'rehype-raw@6.1.1',
          'remark-gfm@3.0.1',
        ]
      : ['react-scripts@5.0.1', 'stylis-plugin-rtl@2.0.2'];

  const REMOVE_DEPENDENCIES = ['vite', 'vite-plugin-checker', '@vitejs/plugin-react-swc'];

  if (INSTALL_DEV_DEPENDENCIES.length) {
    console.log(chalk.blue('⚙️  Installing dev dependencies.'));

    execSync(`npm install -D ${INSTALL_DEV_DEPENDENCIES.join(' ')}`, {
      stdio: 'inherit',
    });
  }

  if (INSTALL_DEPENDENCIES.length) {
    console.log(chalk.blue('⚙️  Installing dependencies.'));

    execSync(`npm install ${INSTALL_DEPENDENCIES.join(' ')}`, {
      stdio: 'inherit',
    });
  }

  if (REMOVE_DEPENDENCIES.length) {
    console.log(chalk.blue('⚙️  Remove unused dependencies.'));

    execSync(`npm uninstall ${REMOVE_DEPENDENCIES.join(' ')}`, {
      stdio: 'inherit',
    });
  }

  execSync(`npm run build`, {
    stdio: 'inherit',
  });
}
