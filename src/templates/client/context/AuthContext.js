export function getAuthContext({ useTypeScript }) {
  const ts = useTypeScript;
  return `import { createContext${ts ? ', ReactNode' : ''} } from 'react';

export const AuthContext = createContext${ts ? '<any>' : ''}(null);

export function AuthProvider({ children }${ts ? ': { children: ReactNode }' : ''}) {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}
`;
}
