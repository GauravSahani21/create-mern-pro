import { Command } from 'commander';
import chalk from 'chalk';
import gradient from 'gradient-string';
import figlet from 'figlet';
import boxen from 'boxen';
import { createProject } from './commands/create.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

function printBanner() {
  const banner = figlet.textSync('MERN Pro', {
    font: 'Big',
    horizontalLayout: 'default',
  });

  console.log('\n' + gradient.pastel.multiline(banner));

  console.log(
    boxen(
      chalk.bold.white('create-mern-pro') +
        chalk.gray(' v' + pkg.version) +
        '\n' +
        chalk.dim('Production-ready MERN stack scaffolding tool'),
      {
        padding: 1,
        margin: { top: 0, bottom: 1, left: 2, right: 2 },
        borderStyle: 'round',
        borderColor: 'cyan',
        dimBorder: false,
      }
    )
  );
}

const program = new Command();

program
  .name('create-mern-pro')
  .description('Scaffold a production-ready MERN stack application')
  .version(pkg.version, '-v, --version', 'Display CLI version')
  .argument('[project-name]', 'Name of the project to scaffold')
  .option('--dry-run', 'Preview what would be created without writing files')
  .option('--skip-install', 'Skip automatic dependency installation')
  .option('--skip-git', 'Skip Git repository initialization')
  .option('--typescript', 'Use TypeScript (skip prompt)')
  .option('--auth', 'Include authentication boilerplate (skip prompt)')
  .option('--use-npm', 'Use npm (default)')
  .option('--use-yarn', 'Use yarn as package manager')
  .option('--use-pnpm', 'Use pnpm as package manager')
  .action(async (projectName, options) => {
    printBanner();
    await createProject(projectName, options);
  });

program.parse(process.argv);
