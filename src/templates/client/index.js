import { getClientPackageJson } from './packageJson.js';
import { getViteConfig } from './viteConfig.js';
import { getIndexHtml } from './indexHtml.js';
import { getIndexCss } from './indexCss.js';
import { getMainJsx } from './mainJsx.js';
import { getAppJsx } from './appJsx.js';
import { getHomePage } from './pages/HomePage.js';
import { getNotFoundPage } from './pages/NotFoundPage.js';
import { getNavbar } from './components/Navbar.js';
import { getApiUtil } from './utils/api.js';
import { getUseAuth } from './hooks/useAuth.js';
import { getAuthContext } from './context/AuthContext.js';
import { getReduxStore } from './store/reduxStore.js';
import { getZustandStore } from './store/zustandStore.js';
import { getClientEslint } from './eslintConfig.js';
import { getClientGitignore } from './gitignore.js';
import { getTailwindConfig } from './tailwindConfig.js';
import { getPostCssConfig } from './postcssConfig.js';

export function getClientTemplates(opts) {
  const {
    projectName,
    includeAuth,
    stateManagement,
    useTypeScript,
    useLinting,
    ext,
    tsExt,
  } = opts;


  const rootFiles = {
    'package.json': getClientPackageJson({ projectName, useTypeScript, useLinting, includeAuth, stateManagement }),
    'vite.config.js': getViteConfig({ useTypeScript }),
    'index.html': getIndexHtml({ projectName }),
    'tailwind.config.js': getTailwindConfig(),
    'postcss.config.js': getPostCssConfig(),
    '.gitignore': getClientGitignore(),
  };

  if (useLinting) {
    rootFiles['eslint.config.js'] = getClientEslint();
  }


  const srcFilesPathPrefix = 'src/';
  rootFiles[`${srcFilesPathPrefix}index.css`] = getIndexCss();
  rootFiles[`${srcFilesPathPrefix}main.${ext}`] = getMainJsx({ stateManagement, includeAuth });
  rootFiles[`${srcFilesPathPrefix}App.${ext}`] = getAppJsx({ includeAuth });
  rootFiles[`${srcFilesPathPrefix}pages/HomePage.${ext}`] = getHomePage();
  rootFiles[`${srcFilesPathPrefix}pages/NotFoundPage.${ext}`] = getNotFoundPage();
  rootFiles[`${srcFilesPathPrefix}components/Navbar.${ext}`] = getNavbar();
  rootFiles[`${srcFilesPathPrefix}utils/api.${tsExt}`] = getApiUtil({ useTypeScript });


  if (includeAuth) {
    rootFiles[`${srcFilesPathPrefix}hooks/useAuth.${tsExt}`] = getUseAuth({ useTypeScript });
    rootFiles[`${srcFilesPathPrefix}context/AuthContext.${ext}`] = getAuthContext({ useTypeScript });
    rootFiles[`${srcFilesPathPrefix}pages/LoginPage.${ext}`] = getLoginPage(useTypeScript);
    rootFiles[`${srcFilesPathPrefix}pages/RegisterPage.${ext}`] = getRegisterPage(useTypeScript);
  }


  if (stateManagement === 'redux') {
    rootFiles[`${srcFilesPathPrefix}store/store.${tsExt}`] = getReduxStore({ useTypeScript });
  } else if (stateManagement === 'zustand') {
    rootFiles[`${srcFilesPathPrefix}store/store.${tsExt}`] = getZustandStore({ useTypeScript });
  }

  return rootFiles;
}

export function getLoginPage() {
  return `import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/login', form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Sign In</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
        <p className="text-sm text-center">No account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
      </form>
    </div>
  );
}
`;
}

export function getRegisterPage() {
  return `import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Create Account</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
        <p className="text-sm text-center">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
      </form>
    </div>
  );
}
`;
}
