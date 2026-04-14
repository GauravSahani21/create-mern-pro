// src/templates/server/envExample.js — safe-to-commit placeholder
export function getEnvExample() {
  return `# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/your-db-name

# JWT
JWT_SECRET=replace_with_a_strong_random_secret
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:5173
`;
}
