import chalk from 'chalk';
import { exec, execSync } from 'child_process';

// ----------------------------------------------------------------------

export function executeSyncCommand(command: string, message?: string) {
  console.log(chalk.blue(message));

  try {
    execSync(command, { stdio: 'inherit' });

    return Promise.resolve('Command executed successfully');
  } catch (error) {
    console.error(chalk.red(`Error executing command: ${error}`));
    return Promise.reject(error);
  }
}

export function executeCommand(command: string, message?: string) {
  console.log(chalk.blue(message));

  return new Promise((resolve, reject) => {
    exec(command, (error) => {
      if (error) {
        console.error(chalk.red(`Error executing command: ${error}`));
        reject(error);
      } else {
        resolve('Command executed successfully');
      }
    });
  });
}
