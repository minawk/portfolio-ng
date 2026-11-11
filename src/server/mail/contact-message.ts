export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readContactMessage(body: unknown): ContactMessage | null {
  if (typeof body !== 'object' || body === null) {
    return null;
  }

  const record = body as Record<string, unknown>;
  const website = record['website'];
  if (typeof website === 'string' && website.trim().length > 0) {
    return null;
  }

  const name = cleanLine(record['name'], 120);
  const email = cleanLine(record['email'], 254);
  const message = cleanText(record['message'], 5000);

  if (!name || !email || !message || !EMAIL_PATTERN.test(email)) {
    return null;
  }

  return { name, email, message };
}

function cleanLine(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const text = value.trim();
  if (!text || text.length > maxLength || /[\r\n]/.test(text)) {
    return null;
  }

  return text;
}

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const text = value.trim();
  if (!text || text.length > maxLength) {
    return null;
  }

  return text;
}
