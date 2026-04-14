// src/templates/server/gitignore.js
export function getServerGitignore() {
  return `node_modules/
dist/
.env
*.log
.DS_Store
`;
}
