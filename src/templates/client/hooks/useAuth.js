export function getUseAuth({ useTypeScript }) {
  const ts = useTypeScript;
  return `import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext${ts ? '' : '.js'}';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
`;
}
