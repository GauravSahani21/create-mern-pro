// src/templates/client/gitignore.js
export function getClientGitignore() {
  return `node_modules/
dist/
.env
.env.local
*.log
.DS_Store
`;
}
