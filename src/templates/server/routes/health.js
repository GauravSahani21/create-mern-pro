export function getHealthRoute({ useTypeScript }) {
  const ts = useTypeScript;
  return `import { Router${ts ? ', Request, Response' : ''} } from 'express';

const router = Router();

router.get('/health', (_req${ts ? ': Request' : ''}, res${ts ? ': Response' : ''}) => {
  res.send('OK');
});

export default router;
`;
}
