import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import {
  getAllowedHosts,
  getContext,
  getTrustProxyHeaders,
} from '@netlify/angular-runtime/app-engine.js';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { readContactMessage } from './server/mail/contact-message';
import { readMailSettings } from './server/mail/mail-settings';
import { sendContactMail } from './server/mail/send-contact-mail';

const envFile = join(process.cwd(), '.env');
if (existsSync(envFile)) {
  process.loadEnvFile(envFile);
}

const angularAppEngine = new AngularAppEngine({
  allowedHosts: [
    'localhost',
    '*.netlify.app',
    '*.minawk.dev',
    'minawk.dev',
    ...(process.env['NETLIFY'] ? getAllowedHosts() : []),
  ],
  trustProxyHeaders: getTrustProxyHeaders(),
});

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();
  const { pathname } = new URL(request.url);

  if (pathname === '/api/contact') {
    return contactResponse(request);
  }

  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);

async function contactResponse(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const message = readContactMessage(body);
  if (!message) {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!readMailSettings(process.env)) {
    return Response.json({ ok: false }, { status: 503 });
  }

  try {
    await sendContactMail(message);
  } catch (error) {
    const code =
      typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : 'error';
    console.error(`Contact mail failed: ${code}`);
    return Response.json({ ok: false }, { status: 502 });
  }

  return new Response(null, { status: 204 });
}
