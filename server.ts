import express from 'express';
import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createServer as createViteServer } from 'vite';
import { INITIAL_QUESTIONS } from './src/data/index';
import type { InterviewQuestion } from './src/types';

dotenv.config({ path: '.env.local' });
dotenv.config();

const port = Number(process.env.PORT || 3000);
const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production';
const dataDirectory = path.resolve('data');
const questionsFile = path.join(dataDirectory, 'questions.json');
const usersDirectory = path.join(dataDirectory, 'users');
const assetsDirectory = path.resolve('src/assets');
const sessionSecret = process.env.SESSION_SECRET || 'change-this-session-secret';
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

interface AuthUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

function getAppUrl(request: express.Request) {
  return process.env.APP_URL || `${request.protocol}://${request.get('host')}`;
}

function sign(value: string) {
  return crypto.createHmac('sha256', sessionSecret).update(value).digest('base64url');
}

function createSession(user: AuthUser) {
  const payload = Buffer.from(JSON.stringify(user)).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function getUser(request: express.Request): AuthUser | null {
  const value = request.header('cookie')?.match(/(?:^|; )session=([^;]+)/)?.[1];
  if (!value) return null;
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return null;
  const expectedSignature = sign(payload);
  if (signature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return null;
  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as AuthUser;
  } catch {
    return null;
  }
}

function requireUser(request: express.Request, response: express.Response) {
  const user = getUser(request);
  if (!user) response.status(401).json({ error: 'Sign in with Google to continue.' });
  return user;
}

function userQuestionsFile(userId: string) {
  const safeId = crypto.createHash('sha256').update(userId).digest('hex');
  return path.join(usersDirectory, `${safeId}.json`);
}

async function readStoredQuestions(file = questionsFile): Promise<{ questions: InterviewQuestion[]; persisted: boolean }> {
  try {
    const contents = await fs.readFile(file, 'utf8');
    const questions = JSON.parse(contents);
    if (Array.isArray(questions)) return { questions, persisted: true };
  } catch {
    // Use the bundled questions until the first save.
  }
  return { questions: INITIAL_QUESTIONS, persisted: false };
}

async function writeStoredQuestions(questions: InterviewQuestion[], file = questionsFile) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(questions, null, 2), 'utf8');
}

const app = express();
app.use(express.json({ limit: '25mb' }));

app.use('/assets', express.static(assetsDirectory));

app.get('/api/auth/google', (request, response) => {
  if (!googleClientId || !googleClientSecret || googleClientSecret.includes('PASTE_YOUR_')) {
    response.status(500).send('Google OAuth is not configured. Add the real GOOGLE_CLIENT_SECRET to .env.local and restart the server.');
    return;
  }
  const state = crypto.randomBytes(24).toString('hex');
  response.cookie('oauth_state', `${state}.${sign(state)}`, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 10 * 60 * 1000 });
  const params = new URLSearchParams({ client_id: googleClientId, redirect_uri: `${getAppUrl(request)}/api/auth/google/callback`, response_type: 'code', scope: 'openid email profile', state, access_type: 'online', prompt: 'select_account' });
  response.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

app.get('/api/auth/google/callback', async (request, response) => {
  const state = String(request.query.state || '');
  const savedState = request.header('cookie')?.match(/(?:^|; )oauth_state=([^;]+)/)?.[1] || '';
  const [savedValue, savedSignature] = savedState.split('.');
  if (!state || state !== savedValue || !savedSignature || savedSignature !== sign(savedValue)) {
    response.status(400).send('Invalid OAuth state.');
    return;
  }
  if (!googleClientId || !googleClientSecret || googleClientSecret.includes('PASTE_YOUR_') || typeof request.query.code !== 'string') {
    response.status(500).send('Google OAuth is not configured. Add the real GOOGLE_CLIENT_SECRET to .env.local and restart the server.');
    return;
  }
  const clientSecret = googleClientSecret;

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ code: request.query.code, client_id: googleClientId, client_secret: clientSecret, redirect_uri: `${getAppUrl(request)}/api/auth/google/callback`, grant_type: 'authorization_code' }) });
    const tokens = await tokenResponse.json() as { access_token?: string; error?: string; error_description?: string };
    if (!tokenResponse.ok || !tokens.access_token) {
      throw new Error(`Google token exchange failed: ${tokens.error_description || tokens.error || tokenResponse.statusText}`);
    }
    const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', { headers: { Authorization: `Bearer ${tokens.access_token}` } });
    const profile = await profileResponse.json() as { sub?: string; name?: string; email?: string; picture?: string; error_description?: string };
    if (!profileResponse.ok || !profile.sub || !profile.email) {
      throw new Error(`Google profile lookup failed: ${profile.error_description || profileResponse.statusText}`);
    }
    const user: AuthUser = { id: profile.sub, name: profile.name || profile.email, email: profile.email, picture: profile.picture };
    response.cookie('session', createSession(user), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 30 * 24 * 60 * 60 * 1000 });
    response.clearCookie('oauth_state');
    response.redirect('/');
  } catch (error) {
    console.error('Google sign-in failed:', error instanceof Error ? error.message : error);
    response.status(502).send('Unable to sign in with Google. Check the server terminal for the Google error details.');
  }
});

app.get('/api/auth/me', (request, response) => response.json({ user: getUser(request) }));
app.post('/api/auth/logout', (_request, response) => {
  response.clearCookie('session');
  response.json({ ok: true });
});

app.post('/api/assets', express.raw({
  type: (request) => request.headers['content-type']?.startsWith('image/') || false,
  limit: '25mb',
}), async (request, response) => {
  if (!requireUser(request, response)) return;
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

app.get('/api/questions', async (request, response) => {
  const user = requireUser(request, response);
  if (!user) return;
  response.json(await readStoredQuestions(userQuestionsFile(user.id)));
});

app.put('/api/questions', async (request, response) => {
  const user = requireUser(request, response);
  if (!user) return;
  if (!Array.isArray(request.body)) {
    response.status(400).json({ error: 'Questions must be an array.' });
    return;
  }

  try {
    await writeStoredQuestions(request.body, userQuestionsFile(user.id));
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
