import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import express, { type ErrorRequestHandler } from 'express';
import { readContactMessage } from './server/mail/contact-message';
import { readMailSettings } from './server/mail/mail-settings';
import { sendContactMail } from './server/mail/send-contact-mail';

const envFile = join(process.cwd(), '.env');
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
app.set('trust proxy', 1);
const angularApp = new AngularNodeAppEngine({
  trustProxyHeaders: true,
});
const recentSends = new Map<string, number[]>();
const sendWindowMs = 10 * 60 * 1000;
const maxSends = 5;

app.use(express.json({ limit: '20kb' }));

app.post('/api/contact', async (req, res) => {
  const message = readContactMessage(req.body);
  if (!message) {
    res.status(400).json({ ok: false });
    return;
  }

  if (!readMailSettings(process.env)) {
    res.status(503).json({ ok: false });
    return;
  }

  const sender = req.ip || 'unknown';
  if (!allowSend(sender)) {
    res.status(429).json({ ok: false });
    return;
  }

  try {
    await sendContactMail(message);
  } catch (error) {
    const code =
      typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : 'error';
    console.error(`Contact mail failed: ${code}`);
    res.status(502).json({ ok: false });
    return;
  }

  res.status(204).end();
});

const rejectBadContactBody: ErrorRequestHandler = (_error, req, res, next) => {
  if (req.path === '/api/contact') {
    res.status(400).json({ ok: false });
    return;
  }

  next(_error);
};

app.use(rejectBadContactBody);

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then(async (response) => {
      if (!response) {
        next();
        return;
      }

      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('text/html')) {
        writeResponseToNodeResponse(response, res);
        return;
      }

      const origin = `${req.protocol}://${req.get('host')}`;
      const html = withAbsoluteLanguageLinks(await response.text(), origin);
      res.status(response.status);
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'content-length') {
          return;
        }
        res.setHeader(key, value);
      });
      res.send(html);
    })
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);

function withAbsoluteLanguageLinks(html: string, origin: string): string {
  return html.replace(
    /(<link rel="alternate" hreflang="(?:fr|en|x-default)" href=")(\/(?:en\/)?)(")/g,
    (_match, start: string, href: string, end: string) => `${start}${origin}${href}${end}`,
  );
}

function allowSend(sender: string): boolean {
  const now = Date.now();
  const stamps = (recentSends.get(sender) ?? []).filter((stamp) => now - stamp < sendWindowMs);
  if (stamps.length >= maxSends) {
    recentSends.set(sender, stamps);
    return false;
  }

  stamps.push(now);
  recentSends.set(sender, stamps);
  return true;
}
