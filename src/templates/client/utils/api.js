export function getApiUtil({ useTypeScript }) {
  const ts = useTypeScript;
  return `import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add interceptors here if needed
api.interceptors.request.use((config${ts ? ': any' : ''}) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

export default api;
`;
}
