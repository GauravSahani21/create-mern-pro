import chalk from 'chalk';
import boxen from 'boxen';
import gradient from 'gradient-string';

export function printSuccess(projectName, config) {
  const pkgManager = config.packageManager || 'npm';
  const runCmd = pkgManager === 'yarn' ? 'yarn' : pkgManager === 'pnpm' ? 'pnpm' : 'npm run';

  const lines = [
    gradient.pastel('  🚀  Project created successfully!\n'),
    chalk.bold.white(`  ${projectName}`) + chalk.dim(' is ready to go.\n'),

    chalk.bold('  Next steps:\n'),
    chalk.cyan(`  cd ${projectName}`),
    '',
    chalk.bold.underline('  Backend:'),
    chalk.cyan(`  cd server`),
    chalk.cyan(`  ${runCmd} dev`),
    '',
    chalk.bold.underline('  Frontend:'),
    chalk.cyan(`  cd client`),
    chalk.cyan(`  ${runCmd} dev`),
    '',
    chalk.bold.underline('  Or run both concurrently from root:'),
    chalk.cyan(`  ${runCmd} dev`),
    '',
    chalk.dim('  ─────────────────────────────────────────────'),

    config.includeAuth
      ? chalk.green('  ✔  Authentication boilerplate included')
      : '',
    config.useTypeScript
      ? chalk.green('  ✔  TypeScript configured')
      : '',
    config.useLinting
      ? chalk.green('  ✔  ESLint + Prettier configured')
      : '',
    config.stateManagement !== 'none'
      ? chalk.green(`  ✔  ${config.stateManagement} state management included`)
      : '',
    config.mongoChoice === 'atlas'
      ? chalk.yellow('  ⚠  Remember to update MONGO_URI in server/.env')
      : '',
    '',
    chalk.dim('  Happy coding! 🎉'),
  ].filter((l) => l !== undefined);

  console.log('\n');
  console.log(
    boxen(lines.join('\n'), {
      padding: 1,
      margin: { top: 0, bottom: 1, left: 1, right: 1 },
      borderStyle: 'round',
      borderColor: 'green',
    })
  );
}
