import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import { getClientTemplates } from '../templates/client/index.js';

export async function scaffoldClient(clientDir, config) {
  const spinner = ora({ text: chalk.cyan('Scaffolding frontend…'), color: 'cyan' }).start();

  try {
    const { projectName, useTypeScript, stateManagement, useLinting, includeAuth, dryRun } = config;

    if (dryRun) {
      spinner.info(chalk.dim('[dry-run] Client files would be written'));
      return;
    }

    const dirs = [
      clientDir,
      path.join(clientDir, 'src', 'components'),
      path.join(clientDir, 'src', 'pages'),
      path.join(clientDir, 'src', 'hooks'),
      path.join(clientDir, 'src', 'utils'),
      path.join(clientDir, 'src', 'assets'),
      path.join(clientDir, 'public'),
    ];

    if (stateManagement !== 'none') {
      dirs.push(path.join(clientDir, 'src', 'store'));
    }

    if (includeAuth) {
      dirs.push(path.join(clientDir, 'src', 'context'));
    }

    for (const dir of dirs) await fs.ensureDir(dir);

    const ext = useTypeScript ? 'tsx' : 'jsx';
    const tsExt = useTypeScript ? 'ts' : 'js';
    const templates = getClientTemplates({ projectName, useTypeScript, stateManagement, useLinting, includeAuth, ext, tsExt });

    for (const [filePath, content] of Object.entries(templates)) {
      await fs.outputFile(path.join(clientDir, filePath), content);
    }

    spinner.succeed(chalk.green('Frontend scaffold complete'));
  } catch (err) {
    spinner.fail(chalk.red('Failed to scaffold frontend'));
    throw err;
  }
}
