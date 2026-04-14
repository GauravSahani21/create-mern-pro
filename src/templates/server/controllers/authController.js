export function getAuthController({ useTypeScript }) {
  const ts = useTypeScript;
  const reqRes = ts ? '(req: Request, res: Response)' : '(req, res)';
  const imports = ts ? `import { Request, Response } from 'express';` : '';

  return `${imports}

export async function register${reqRes} {
  res.send('Register route');
}

export async function login${reqRes} {
  res.send('Login route');
}

export async function getMe${reqRes} {
  res.send('Get Me route');
}
`;
}
