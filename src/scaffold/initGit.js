import ora from 'ora';
import chalk from 'chalk';
import { logger } from '../utils/logger.js';
import { runSync, commandExists } from '../utils/runCommand.js';

export async function initGitRepo(projectDir, config) {
  if (!commandExists('git')) {
    logger.warn('Git not found in PATH — skipping git init.');
    return;
  }

  const spinner = ora({ text: chalk.cyan('Initializing Git repository…'), color: 'cyan' }).start();

  try {
    const ok = runSync('git init', projectDir, true);
    if (!ok) throw new Error('git init failed');

    runSync('git add -A', projectDir, true);
    runSync(
      `git commit -m "chore: initial commit from create-mern-pro"`,
      projectDir,
      true
    );

    spinner.succeed(chalk.green('Git repository initialized with initial commit'));
    logger.dim('Run `git remote add origin <url>` to connect to a remote repository.');
  } catch (err) {
    spinner.fail(chalk.yellow('Git init failed (non-critical) — continuing.'));
  }
}
