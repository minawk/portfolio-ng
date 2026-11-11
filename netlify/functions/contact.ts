import { readContactMessage } from '../../src/server/mail/contact-message';
import { readMailSettings } from '../../src/server/mail/mail-settings';
import { sendContactMail } from '../../src/server/mail/send-contact-mail';

export default async function handler(request: Request): Promise<Response> {
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
