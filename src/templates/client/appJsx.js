export function getAppJsx({ includeAuth = false } = {}) {
  const authImports = includeAuth
    ? `import LoginPage from './pages/LoginPage';\nimport RegisterPage from './pages/RegisterPage';`
    : '';

  const authRoutes = includeAuth
    ? `\n        <Route path="/login" element={<LoginPage />} />\n        <Route path="/register" element={<RegisterPage />} />`
    : '';

  return `import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
${authImports ? authImports + '\n' : ''}
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        ${includeAuth ? `<Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        ` : ''}<Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
`;
}
