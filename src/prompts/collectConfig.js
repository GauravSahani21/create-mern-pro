import inquirer from 'inquirer';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';

export async function collectProjectConfig(projectName, cliOptions = {}) {
  logger.info(
    `Configuring ${chalk.bold.cyan(projectName)} — answer a few questions:\n`
  );

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'useTypeScript',
      message: chalk.white('Use TypeScript?'),
      default: false,
      when: () => !cliOptions.typescript,
    },

    {
      type: 'list',
      name: 'mongoChoice',
      message: chalk.white('MongoDB setup:'),
      choices: [
        { name: 'Local  (mongodb://127.0.0.1:27017)', value: 'local' },
        { name: 'Atlas  (enter your connection string)', value: 'atlas' },
      ],
      default: 'local',
    },
    {
      type: 'password',
      name: 'mongoUri',
      message: chalk.white('Paste your MongoDB Atlas connection string:'),
      mask: '*',
      when: (ans) => ans.mongoChoice === 'atlas',
      validate: (val) =>
        val.startsWith('mongodb+srv://') || val.startsWith('mongodb://')
          ? true
          : 'Must be a valid MongoDB URI (mongodb+srv:// or mongodb://)',
    },

    {
      type: 'confirm',
      name: 'includeAuth',
      message: chalk.white('Include JWT authentication boilerplate?'),
      default: true,
      when: () => !cliOptions.auth,
    },

    {
      type: 'list',
      name: 'stateManagement',
      message: chalk.white('Frontend state management:'),
      choices: [
        { name: 'None  (React context / local state)', value: 'none' },
        { name: 'Redux Toolkit', value: 'redux' },
        { name: 'Zustand', value: 'zustand' },
      ],
      default: 'none',
    },

    {
      type: 'confirm',
      name: 'useLinting',
      message: chalk.white('Add ESLint + Prettier?'),
      default: true,
    },

    {
      type: 'list',
      name: 'packageManager',
      message: chalk.white('Package manager:'),
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' },
      ],
      default: cliOptions.useYarn ? 'yarn' : cliOptions.usePnpm ? 'pnpm' : 'npm',
      when: () => !cliOptions.useYarn && !cliOptions.usePnpm,
    },

    {
      type: 'confirm',
      name: 'installDeps',
      message: chalk.white('Install dependencies now?'),
      default: true,
      when: () => !cliOptions.skipInstall,
    },

    {
      type: 'confirm',
      name: 'initGit',
      message: chalk.white('Initialize a Git repository?'),
      default: true,
      when: () => !cliOptions.skipGit,
    },
  ]);

  const config = {
    projectName,
    useTypeScript: cliOptions.typescript || answers.useTypeScript || false,
    mongoChoice: answers.mongoChoice || 'local',
    mongoUri: answers.mongoUri || '',
    includeAuth: cliOptions.auth !== undefined ? cliOptions.auth : (answers.includeAuth ?? true),
    stateManagement: answers.stateManagement || 'none',
    useLinting: answers.useLinting !== undefined ? answers.useLinting : true,
    packageManager:
      cliOptions.useYarn
        ? 'yarn'
        : cliOptions.usePnpm
        ? 'pnpm'
        : answers.packageManager || 'npm',
    installDeps: cliOptions.skipInstall ? false : (answers.installDeps ?? true),
    initGit: cliOptions.skipGit ? false : (answers.initGit ?? true),
    dryRun: cliOptions.dryRun || false,
  };

  logger.blank();
  logger.success('Configuration collected successfully.');
  return config;
}
