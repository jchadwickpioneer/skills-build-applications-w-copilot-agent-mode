import express from 'express';
import { connectDatabase, isDatabaseConnected } from './config/database.js';
import apiRouter from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  const database = isDatabaseConnected() ? 'available' : 'unavailable';
  response.status(database === 'available' ? 200 : 503).json({ status: 'ok', database });
});

app.use('/api', apiRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(400).json({ error: 'Request could not be completed' });
});

async function startServer() {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('MongoDB is unavailable:', error);
  }

  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

startServer();
