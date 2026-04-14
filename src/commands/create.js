import path from 'path';
import { existsSync } from 'fs';
import chalk from 'chalk';
import { collectProjectConfig } from '../prompts/collectConfig.js';
import { validateProjectName } from '../utils/validate.js';
import { handleExistingDirectory } from '../utils/existingDir.js';
import { scaffoldProject } from '../scaffold/scaffoldProject.js';
import { logger } from '../utils/logger.js';
import { printSuccess } from '../utils/successMessage.js';

export async function createProject(projectName, cliOptions = {}) {
  try {
    let resolvedName = projectName;

    if (!resolvedName) {
      const { default: inquirer } = await import('inquirer');
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: chalk.cyan('What is your project name?'),
          default: 'my-mern-app',
          validate: (val) => {
            const v = validateProjectName(val);
            return v.valid ? true : v.errors[0];
          },
        },
      ]);
      resolvedName = answer.name;
    }

    const validation = validateProjectName(resolvedName);
    if (!validation.valid) {
      logger.error(`Invalid project name: ${validation.errors.join(', ')}`);
      process.exit(1);
    }

    const projectDir = path.resolve(process.cwd(), resolvedName);

    if (existsSync(projectDir)) {
      const shouldContinue = await handleExistingDirectory(projectDir);
      if (!shouldContinue) {
        logger.warn('Operation cancelled.');
        process.exit(0);
      }
    }

    logger.section('Project Configuration');
    const config = await collectProjectConfig(resolvedName, cliOptions);

    logger.section('Scaffolding Project');
    await scaffoldProject(projectDir, config, cliOptions);

    printSuccess(resolvedName, config);
  } catch (err) {
    logger.error(`Unexpected error: ${err.message}`);
    if (process.env.DEBUG) console.error(err);
    process.exit(1);
  }
}
