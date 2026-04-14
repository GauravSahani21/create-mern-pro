// src/templates/server/env.js
export function getServerEnv({ resolvedMongoUri, jwtSecret }) {
  return `# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB
MONGO_URI=${resolvedMongoUri}

# JWT (auto-generated — change before going to production)
JWT_SECRET=${jwtSecret}
JWT_EXPIRES_IN=7d

# CORS — comma-separated list of allowed origins
CORS_ORIGIN=http://localhost:5173
`;
}

// src/templates/server/envExample.js — safe to commit
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
