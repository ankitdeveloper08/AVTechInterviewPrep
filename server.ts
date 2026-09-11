import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_QUESTIONS } from './src/data/index';
import type { InterviewQuestion } from './src/types';

const port = Number(process.env.PORT || 3000);
const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production';
const dataDirectory = path.resolve('data');
const questionsFile = path.join(dataDirectory, 'questions.json');
const assetsDirectory = path.resolve('src/assets');

async function readStoredQuestions(): Promise<{ questions: InterviewQuestion[]; persisted: boolean }> {
  try {
    const contents = await fs.readFile(questionsFile, 'utf8');
    const questions = JSON.parse(contents);
    if (Array.isArray(questions)) return { questions, persisted: true };
  } catch {
    // Use the bundled questions until the first save.
  }
  return { questions: INITIAL_QUESTIONS, persisted: false };
}

async function writeStoredQuestions(questions: InterviewQuestion[]) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(questionsFile, JSON.stringify(questions, null, 2), 'utf8');
}

const app = express();
app.use(express.json({ limit: '25mb' }));

app.use('/assets', express.static(assetsDirectory));

app.post('/api/assets', express.raw({
  type: (request) => request.headers['content-type']?.startsWith('image/') || false,
  limit: '25mb',
}), async (request, response) => {
  if (!Buffer.isBuffer(request.body) || request.body.length === 0) {
    response.status(400).json({ error: 'An image file is required.' });
    return;
  }

  const contentType = request.header('content-type') || 'image/png';
  const extension = contentType.split('/')[1]?.split(';')[0].replace(/[^a-z0-9]/gi, '') || 'png';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  try {
    await fs.mkdir(assetsDirectory, { recursive: true });
    await fs.writeFile(path.join(assetsDirectory, fileName), request.body);
    response.json({ src: `/assets/${fileName}` });
  } catch {
    response.status(500).json({ error: 'Unable to store image.' });
  }
});

app.get('/api/questions', async (_request, response) => {
  response.json(await readStoredQuestions());
});

app.put('/api/questions', async (request, response) => {
  if (!Array.isArray(request.body)) {
    response.status(400).json({ error: 'Questions must be an array.' });
    return;
  }

  try {
    await writeStoredQuestions(request.body);
    response.json({ ok: true });
  } catch {
    response.status(500).json({ error: 'Unable to save questions.' });
  }
});

if (isProduction) {
  app.use(express.static(path.resolve('dist')));
  app.get('*', (_request, response) => response.sendFile(path.resolve('dist/index.html')));
} else {
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Interview Prep Pro running on http://localhost:${port}`);
});
