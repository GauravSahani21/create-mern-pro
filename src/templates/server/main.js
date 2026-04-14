export function getServerMain({ includeAuth, useTypeScript }) {
  const ts = useTypeScript;

  return `import 'dotenv/config';
import express${ts ? ', { Application, Request, Response }' : ''} from 'express';
import cors from 'cors';
import { connectDB } from './config/db${ts ? '' : '.js'}';
import healthRouter from './routes/health${ts ? '' : '.js'}';
${includeAuth ? `import authRouter from './routes/auth${ts ? '' : '.js'}';` : ''}

const app${ts ? ': Application' : ''} = express();

app.use(cors());
app.use(express.json());

app.use('/api', healthRouter);
${includeAuth ? "app.use('/api/auth', authRouter);" : ''}

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();
  app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
}

bootstrap();
`;
}
