import ora from 'ora';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';
import { runAsync } from '../utils/runCommand.js';

export async function installDependencies(serverDir, clientDir, config) {
  const { packageManager = 'npm' } = config;
  const installCmd = packageManager;
  const installArgs = ['install'];

  {
    const spinner = ora({
      text: chalk.cyan(`Installing server dependencies with ${packageManager}…`),
      color: 'cyan',
    }).start();
    try {
      await runAsync(installCmd, installArgs, serverDir);
      spinner.succeed(chalk.green('Server dependencies installed'));
    } catch (err) {
      spinner.fail(chalk.red('Server dependency installation failed'));
      logger.error(err.message);
      logger.warn(`Run \`${packageManager} install\` manually inside the server/ directory.`);
    }
  }

  {
    const spinner = ora({
      text: chalk.cyan(`Installing client dependencies with ${packageManager}…`),
      color: 'cyan',
    }).start();
    try {
      await runAsync(installCmd, installArgs, clientDir);
      spinner.succeed(chalk.green('Client dependencies installed'));
    } catch (err) {
      spinner.fail(chalk.red('Client dependency installation failed'));
      logger.error(err.message);
      logger.warn(`Run \`${packageManager} install\` manually inside the client/ directory.`);
    }
  }
}
