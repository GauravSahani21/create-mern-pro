export function getReduxStore({ useTypeScript }) {
  const ts = useTypeScript;
  return `import { configureStore } from '@reduxjs/toolkit';
${ts ? `import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';` : `import { useDispatch, useSelector } from 'react-redux';`}

export const store = configureStore({
  reducer: {
    // Add slices here
  },
});

${ts ? `export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
` : `export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
`}
`;
}
