import { createTransport } from 'nodemailer';
import type { ContactMessage } from './contact-message';
import { readMailSettings, type MailSettings } from './mail-settings';

export async function sendContactMail(
  message: ContactMessage,
  settings: MailSettings | null = readMailSettings(process.env),
): Promise<void> {
  if (!settings) {
    throw new Error('Mail is not configured');
  }

  const transport = createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.port === 465,
    auth: {
      user: settings.user,
      pass: settings.pass,
    },
  });

  try {
    await transport.sendMail({
      from: settings.from,
      to: settings.to,
      replyTo: message.email,
      subject: `Portfolio — ${message.subject}`,
      text: `${message.name}\n${message.email}\n\n${message.message}`,
    });
  } finally {
    transport.close();
  }
}
