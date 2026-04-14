import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';
import { scaffoldServer } from './scaffoldServer.js';
import { scaffoldClient } from './scaffoldClient.js';
import { scaffoldRoot } from './scaffoldRoot.js';
import { installDependencies } from './installDeps.js';
import { initGitRepo } from './initGit.js';

export async function scaffoldProject(projectDir, config, cliOptions = {}) {
  const { dryRun } = config;

  if (dryRun) {
    logger.warn('DRY RUN mode — no files will be written.\n');
  }

  const spinner = ora({
    text: chalk.cyan('Creating project structure…'),
    color: 'cyan',
  }).start();

  try {
    if (!dryRun) {
      await fs.ensureDir(projectDir);
    }
    spinner.succeed(chalk.green('Project directory ready'));
  } catch (err) {
    spinner.fail(chalk.red('Failed to create project directory'));
    throw err;
  }

  await scaffoldRoot(projectDir, config);

  const serverDir = path.join(projectDir, 'server');
  await scaffoldServer(serverDir, config);

  const clientDir = path.join(projectDir, 'client');
  await scaffoldClient(clientDir, config);

  if (config.installDeps && !dryRun) {
    logger.section('Installing Dependencies');
    await installDependencies(serverDir, clientDir, config);
  } else if (!config.installDeps) {
    logger.warn('Skipping dependency installation. Run npm install manually.');
  }

  if (config.initGit && !dryRun) {
    logger.section('Initializing Git');
    await initGitRepo(projectDir, config);
  }
}
