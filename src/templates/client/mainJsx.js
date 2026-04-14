export function getMainJsx({ stateManagement, includeAuth }) {
  const isRedux = stateManagement === 'redux';
  const isZustand = stateManagement === 'zustand';
  const useAuthContext = includeAuth && !isRedux && !isZustand;

  const extraImports = [
    isRedux ? `import { Provider } from 'react-redux';\nimport { store } from './store/store';` : '',
    useAuthContext ? `import { AuthProvider } from './context/AuthContext';` : '',
  ].filter(Boolean).join('\n');

  const wrapOpen = [
    isRedux ? '    <Provider store={store}>' : '',
    useAuthContext ? '    <AuthProvider>' : '',
  ].filter(Boolean).join('\n');

  const wrapClose = [
    useAuthContext ? '    </AuthProvider>' : '',
    isRedux ? '    </Provider>' : '',
  ].filter(Boolean).join('\n');

  return `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
${extraImports ? extraImports + '\n' : ''}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
${wrapOpen ? wrapOpen + '\n' : ''}    <BrowserRouter>
      <App />
    </BrowserRouter>
${wrapClose ? wrapClose + '\n' : ''}  </React.StrictMode>
);
`;
}
