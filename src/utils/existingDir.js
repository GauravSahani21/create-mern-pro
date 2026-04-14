import inquirer from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';
import { logger } from './logger.js';

export async function handleExistingDirectory(projectDir) {
  logger.warn(`Directory already exists: ${chalk.yellow(projectDir)}`);
  logger.blank();

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.yellow('How would you like to handle the existing directory?'),
      choices: [
        {
          name: `${chalk.red('Overwrite')}  — Delete and recreate (destructive)`,
          value: 'overwrite',
        },
        {
          name: `${chalk.yellow('Merge')}     — Keep existing files, add new ones`,
          value: 'merge',
        },
        {
          name: `${chalk.gray('Cancel')}    — Abort the operation`,
          value: 'cancel',
        },
      ],
    },
  ]);

  if (action === 'cancel') {
    return false;
  }

  if (action === 'overwrite') {
    logger.step(`Removing existing directory…`);
    await fs.remove(projectDir);
    logger.success('Directory removed.');
  }

  return true;
}
