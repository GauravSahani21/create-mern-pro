import chalk from 'chalk';

const ICONS = {
  success: '✔',
  error: '✖',
  warn: '⚠',
  info: 'ℹ',
  step: '›',
  section: '◆',
};

export const logger = {
  success(msg) {
    console.log(`  ${chalk.green(ICONS.success)}  ${chalk.green(msg)}`);
  },

  error(msg) {
    console.error(`  ${chalk.red(ICONS.error)}  ${chalk.red(msg)}`);
  },

  warn(msg) {
    console.warn(`  ${chalk.yellow(ICONS.warn)}  ${chalk.yellow(msg)}`);
  },

  info(msg) {
    console.log(`  ${chalk.cyan(ICONS.info)}  ${chalk.white(msg)}`);
  },

  step(msg) {
    console.log(`  ${chalk.blue(ICONS.step)}  ${chalk.white(msg)}`);
  },

  section(title) {
    console.log('');
    console.log(
      `  ${chalk.bold.magenta(ICONS.section)}  ${chalk.bold.magenta(title)}`
    );
    console.log(`  ${chalk.magenta('─'.repeat(title.length + 4))}`);
  },

  blank() {
    console.log('');
  },

  dim(msg) {
    console.log(`     ${chalk.dim(msg)}`);
  },
};
