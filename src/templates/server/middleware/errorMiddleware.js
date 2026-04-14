export function getErrorMiddleware({ useTypeScript }) {
  const ts = useTypeScript;
  const types = ts ? ': any, req: Request, res: Response, next: NextFunction' : '';
  const importExpress = ts ? `import { Request, Response, NextFunction } from 'express';\n\n` : '';

  return `${importExpress}export function errorHandler(err${types}) {
  console.error(err);
  res.status(500).send('Server Error');
}
`;
}
