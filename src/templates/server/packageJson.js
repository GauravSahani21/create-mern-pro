// src/templates/server/packageJson.js
export function getServerPackageJson({ projectName, useTypeScript, useLinting, includeAuth }) {
  const deps = {
    express: '^4.19.2',
    mongoose: '^8.3.4',
    cors: '^2.8.5',
    dotenv: '^16.4.5',
    'express-validator': '^7.1.0',
    'express-rate-limit': '^7.3.1',
    helmet: '^7.1.0',
    morgan: '^1.10.0',
  };

  if (includeAuth) {
    deps['bcryptjs'] = '^2.4.3';
    deps['jsonwebtoken'] = '^9.0.2';
  }

  const devDeps = {
    nodemon: '^3.1.3',
  };

  if (useTypeScript) {
    devDeps['typescript'] = '^5.4.5';
    devDeps['ts-node'] = '^10.9.2';
    devDeps['ts-node-dev'] = '^2.0.0';
    devDeps['@types/node'] = '^20.12.12';
    devDeps['@types/express'] = '^4.17.21';
    devDeps['@types/cors'] = '^2.8.17';
    devDeps['@types/morgan'] = '^1.9.9';
    if (includeAuth) {
      devDeps['@types/bcryptjs'] = '^2.4.6';
      devDeps['@types/jsonwebtoken'] = '^9.0.6';
    }
  }

  if (useLinting) {
    devDeps['eslint'] = '^8.57.0';
    devDeps['prettier'] = '^3.2.5';
  }

  const scripts = useTypeScript
    ? {
        dev: 'ts-node-dev --respawn --transpile-only index.ts',
        build: 'tsc',
        start: 'node dist/index.js',
        lint: useLinting ? 'eslint . --ext .ts' : undefined,
        format: useLinting ? 'prettier --write .' : undefined,
      }
    : {
        dev: 'nodemon index.js',
        start: 'node index.js',
        lint: useLinting ? 'eslint .' : undefined,
        format: useLinting ? 'prettier --write .' : undefined,
      };

  // Remove undefined values
  Object.keys(scripts).forEach((k) => scripts[k] === undefined && delete scripts[k]);

  const pkg = {
    name: `${projectName}-server`,
    version: '1.0.0',
    description: `${projectName} Express API server`,
    type: 'module',
    main: useTypeScript ? 'dist/index.js' : 'index.js',
    scripts,
    dependencies: deps,
    devDependencies: devDeps,
  };

  if (useTypeScript) {
    pkg.scripts.build = 'tsc';
  }

  return JSON.stringify(pkg, null, 2);
}
