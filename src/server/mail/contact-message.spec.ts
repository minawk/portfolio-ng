import { readContactMessage } from './contact-message';
import { readMailSettings } from './mail-settings';

describe('readContactMessage', () => {
  it('accepts a trimmed message', () => {
    expect(
      readContactMessage({
        name: ' Aina ',
        email: ' aina@example.com ',
        message: ' Bonjour ',
      }),
    ).toEqual({
      name: 'Aina',
      email: 'aina@example.com',
      message: 'Bonjour',
    });
  });

  it('rejects a filled honeypot', () => {
    expect(
      readContactMessage({
        name: 'Aina',
        email: 'aina@example.com',
        message: 'Bonjour',
        website: 'https://spam.example',
      }),
    ).toBeNull();
  });

  it('rejects a missing field, a broken email, and a header break', () => {
    expect(readContactMessage({ name: 'Aina', email: 'aina@example.com' })).toBeNull();
    expect(
      readContactMessage({ name: 'Aina', email: 'pas-une-adresse', message: 'Bonjour' }),
    ).toBeNull();
    expect(
      readContactMessage({ name: 'Aina\nBcc: x', email: 'aina@example.com', message: 'Bonjour' }),
    ).toBeNull();
    expect(readContactMessage(null)).toBeNull();
  });
});

describe('readMailSettings', () => {
  it('reads a complete mail configuration', () => {
    expect(
      readMailSettings({
        SMTP_HOST: 'smtp.example.com',
        SMTP_PORT: '587',
        SMTP_USER: 'user',
        SMTP_PASS: 'secret',
        CONTACT_TO: 'to@example.com',
        CONTACT_FROM: 'from@example.com',
      }),
    ).toEqual({
      host: 'smtp.example.com',
      port: 587,
      user: 'user',
      pass: 'secret',
      to: 'to@example.com',
      from: 'from@example.com',
    });
  });

  it('returns null when a value is missing', () => {
    expect(readMailSettings({ SMTP_HOST: 'smtp.example.com', SMTP_PORT: '587' })).toBeNull();
  });
});
