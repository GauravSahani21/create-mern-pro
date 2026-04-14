export function getAuthMiddleware({ useTypeScript }) {
  const ts = useTypeScript;
  return `${ts ? `import { Request, Response, NextFunction } from 'express';` : ''}

export async function protect(req${ts ? ': Request' : ''}, res${ts ? ': Response' : ''}, next${ts ? ': NextFunction' : ''}) {
  // Add authentication logic here
  next();
}
`;
}
