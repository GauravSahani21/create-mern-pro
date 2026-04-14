import { getServerPackageJson } from './packageJson.js';
import { getServerEnv } from './env.js';
import { getServerMain } from './main.js';
import { getDbConfig } from './config/db.js';
import { getHealthRoute } from './routes/health.js';
import { getAuthRoute } from './routes/auth.js';
import { getAuthController } from './controllers/authController.js';
import { getUserModel } from './models/userModel.js';
import { getAuthMiddleware } from './middleware/authMiddleware.js';
import { getErrorMiddleware } from './middleware/errorMiddleware.js';
import { getEslintConfig } from './eslintConfig.js';
import { getPrettierConfig } from './prettierConfig.js';
import { getServerGitignore } from './gitignore.js';
import { getEnvExample } from './envExample.js';

export function getServerTemplates(opts) {
  const {
    projectName,
    resolvedMongoUri,
    jwtSecret,
    includeAuth,
    useTypeScript,
    useLinting,
    ext,
  } = opts;

  const templates = {
    'package.json': getServerPackageJson({ projectName, useTypeScript, useLinting, includeAuth }),
    '.env': getServerEnv({ resolvedMongoUri, jwtSecret }),
    '.env.example': getEnvExample(),
    '.gitignore': getServerGitignore(),
    [`index.${ext}`]: getServerMain({ includeAuth, useTypeScript }),
    [`config/db.${ext}`]: getDbConfig({ useTypeScript }),
    [`routes/health.${ext}`]: getHealthRoute({ useTypeScript }),
  };

  if (includeAuth) {
    templates[`routes/auth.${ext}`] = getAuthRoute({ useTypeScript });
    templates[`controllers/authController.${ext}`] = getAuthController({ useTypeScript });
    templates[`models/User.${ext}`] = getUserModel({ useTypeScript });
    templates[`middleware/auth.${ext}`] = getAuthMiddleware({ useTypeScript });
  }

  templates[`middleware/errorHandler.${ext}`] = getErrorMiddleware({ useTypeScript });

  if (useLinting) {
    templates['.eslintrc.cjs'] = getEslintConfig();
    templates['.prettierrc'] = getPrettierConfig();
  }

  return templates;
}
