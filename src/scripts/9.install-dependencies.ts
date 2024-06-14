import { executeCommand } from '../utils/execute-command';

// ----------------------------------------------------------------------

export async function installDependencies() {
  const INSTALL_DEPENDENCIES = ['react-scripts@5.0.1'];

  const INSTALL_DEV_DEPENDENCIES = [
    '@craco/craco',
    '@babel/plugin-proposal-private-property-in-object@latest',
  ];

  const REMOVE_DEPENDENCIES = ['vite', 'vite-plugin-checker', '@vitejs/plugin-react-swc'];

  if (INSTALL_DEPENDENCIES.length) {
    await executeCommand(
      `npm install ${INSTALL_DEPENDENCIES.join(' ')}`,
      '⚙️  Installing dependencies...'
    );
  }

  if (INSTALL_DEV_DEPENDENCIES.length) {
    await executeCommand(
      `npm install -D ${INSTALL_DEV_DEPENDENCIES.join(' ')}`,
      '⚙️  Installing dev dependencies...'
    );
  }

  if (REMOVE_DEPENDENCIES.length) {
    await executeCommand(
      `npm uninstall ${REMOVE_DEPENDENCIES.join(' ')}`,
      '⚙️  Remove unused dependencies...'
    );
  }
}
