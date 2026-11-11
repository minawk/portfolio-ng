export interface MailSettings {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
  from: string;
}

export function readMailSettings(env: Record<string, string | undefined>): MailSettings | null {
  const host = env['SMTP_HOST']?.trim();
  const portText = env['SMTP_PORT']?.trim();
  const user = env['SMTP_USER']?.trim();
  const pass = env['SMTP_PASS'];
  const to = env['CONTACT_TO']?.trim();
  const from = env['CONTACT_FROM']?.trim();
  const port = Number(portText);

  if (
    !host ||
    !portText ||
    !user ||
    !pass ||
    !to ||
    !from ||
    !Number.isInteger(port) ||
    port <= 0
  ) {
    return null;
  }

  return { host, port, user, pass, to, from };
}
