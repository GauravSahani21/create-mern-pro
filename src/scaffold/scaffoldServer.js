import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import chalk from 'chalk';
import { generateSecret } from '../utils/crypto.js';
import { getServerTemplates } from '../templates/server/index.js';

export async function scaffoldServer(serverDir, config) {
  const spinner = ora({ text: chalk.cyan('Scaffolding backend…'), color: 'cyan' }).start();

  try {
    const { projectName, mongoChoice, mongoUri, includeAuth, useTypeScript, useLinting, dryRun } = config;
    const ext = useTypeScript ? 'ts' : 'js';
    const jwtSecret = generateSecret(32);

    const resolvedMongoUri =
      mongoChoice === 'atlas'
        ? mongoUri
        : `mongodb://127.0.0.1:27017/${projectName}`;

    if (dryRun) {
      spinner.info(chalk.dim('[dry-run] Server files would be written'));
      return;
    }

    const dirs = [
      serverDir,
      path.join(serverDir, 'config'),
      path.join(serverDir, 'controllers'),
      path.join(serverDir, 'middleware'),
      path.join(serverDir, 'models'),
      path.join(serverDir, 'routes'),
    ];
    for (const dir of dirs) await fs.ensureDir(dir);

    const templates = getServerTemplates({ projectName, resolvedMongoUri, jwtSecret, includeAuth, useTypeScript, useLinting, ext });

    for (const [filePath, content] of Object.entries(templates)) {
      await fs.outputFile(path.join(serverDir, filePath), content);
    }

    spinner.succeed(chalk.green('Backend scaffold complete'));
  } catch (err) {
    spinner.fail(chalk.red('Failed to scaffold backend'));
    throw err;
  }
}
