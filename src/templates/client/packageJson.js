// src/templates/client/packageJson.js
export function getClientPackageJson({ projectName, useTypeScript, stateManagement, useLinting }) {
  const deps = {
    react: '^18.3.1',
    'react-dom': '^18.3.1',
    'react-router-dom': '^6.23.1',
    axios: '^1.7.2',
  };

  if (stateManagement === 'redux') {
    deps['@reduxjs/toolkit'] = '^2.2.5';
    deps['react-redux'] = '^9.1.2';
  } else if (stateManagement === 'zustand') {
    deps['zustand'] = '^4.5.2';
  }

  const devDeps = {
    vite: '^5.2.12',
    '@vitejs/plugin-react': '^4.3.0',
    tailwindcss: '^3.4.4',
    autoprefixer: '^10.4.19',
    postcss: '^8.4.38',
  };

  if (useTypeScript) {
    devDeps['typescript'] = '^5.4.5';
    devDeps['@types/react'] = '^18.3.3';
    devDeps['@types/react-dom'] = '^18.3.0';
    devDeps['@types/node'] = '^20.12.12';
  }

  if (useLinting) {
    devDeps['eslint'] = '^8.57.0';
    devDeps['eslint-plugin-react'] = '^7.34.2';
    devDeps['eslint-plugin-react-hooks'] = '^4.6.2';
    devDeps['prettier'] = '^3.2.5';
  }

  const scripts = {
    dev: 'vite',
    build: 'vite build',
    preview: 'vite preview',
    lint: useLinting ? 'eslint src --ext .jsx,.js,.tsx,.ts' : undefined,
    format: useLinting ? 'prettier --write src/' : undefined,
  };

  // Remove undefined values
  Object.keys(scripts).forEach((k) => scripts[k] === undefined && delete scripts[k]);

  return JSON.stringify(
    {
      name: `${projectName}-client`,
      version: '1.0.0',
      private: true,
      type: 'module',
      scripts,
      dependencies: deps,
      devDependencies: devDeps,
    },
    null,
    2
  );
}
