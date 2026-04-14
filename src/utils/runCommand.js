import { execSync, spawn } from 'child_process';
import chalk from 'chalk';
import { logger } from './logger.js';

export function runSync(command, cwd, silent = false) {
  try {
    execSync(command, {
      cwd,
      stdio: silent ? 'pipe' : 'inherit',
      env: { ...process.env },
    });
    return true;
  } catch (err) {
    logger.error(`Command failed: ${chalk.dim(command)}`);
    if (!silent && err.stderr) {
      console.error(chalk.red(err.stderr.toString()));
    }
    return false;
  }
}

export function runAsync(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32',
      env: { ...process.env },
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`"${command} ${args.join(' ')}" exited with code ${code}`));
      } else {
        resolve();
      }
    });

    child.on('error', (err) => {
      reject(new Error(`Failed to start command "${command}": ${err.message}`));
    });
  });
}

export function commandExists(cmd) {
  try {
    execSync(`${process.platform === 'win32' ? 'where' : 'which'} ${cmd}`, {
      stdio: 'pipe',
    });
    return true;
  } catch {
    return false;
  }
}
