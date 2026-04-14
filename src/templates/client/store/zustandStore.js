export function getZustandStore({ useTypeScript }) {
  const ts = useTypeScript;
  return `import { create } from 'zustand';

${ts ? `interface AppState {
  // define state
}
` : ''}
export const useStore = create${ts ? '<AppState>' : ''}()((set) => ({
  // state fields
}));
`;
}
