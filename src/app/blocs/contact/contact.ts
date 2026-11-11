import { Component, signal } from '@angular/core';
import { email, form, FormField, FormRoot, maxLength, required } from '@angular/forms/signals';

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  imports: [FormField, FormRoot],
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly model = signal<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  protected readonly sent = signal(false);
  protected readonly sendFailed = signal(false);
  protected readonly honeypot = signal('');
  protected readonly copied = signal<'email' | 'phone' | null>(null);
  private copyTimer = 0;
  protected readonly contactForm = form(
    this.model,
    (path) => {
      required(path.name, { message: $localize`:@@contactNameRequired:Indiquez votre nom.` });
      maxLength(path.name, 120, { message: $localize`:@@contactNameTooLong:Le nom est trop long.` });
      required(path.email, {
        message: $localize`:@@contactEmailRequired:Indiquez votre adresse e-mail.`,
      });
      email(path.email, {
        message: $localize`:@@contactEmailInvalid:Indiquez une adresse e-mail valide.`,
        when: ({ value }) => value().length > 0,
      });
      required(path.subject, { message: $localize`:@@contactSubjectRequired:Indiquez l'objet.` });
      maxLength(path.subject, 160, {
        message: $localize`:@@contactSubjectTooLong:L'objet est trop long.`,
      });
      required(path.message, {
        message: $localize`:@@contactMessageRequired:Écrivez votre message.`,
      });
      maxLength(path.message, 5000, {
        message: $localize`:@@contactMessageTooLong:Le message est trop long.`,
      });
    },
    {
      submission: {
        action: async () => {
          this.sent.set(false);
          this.sendFailed.set(false);
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...this.contactForm().value(),
                website: this.honeypot(),
              }),
            });
            if (!response.ok) {
              this.sendFailed.set(true);
              return undefined;
            }
          } catch {
            this.sendFailed.set(true);
            return undefined;
          }

          this.contactForm().reset({ name: '', email: '', subject: '', message: '' });
          this.honeypot.set('');
          this.sent.set(true);
          return undefined;
        },
      },
    },
  );

  protected async copy(value: string, key: 'email' | 'phone'): Promise<void> {
    if (!(await this.writeClipboard(value))) {
      return;
    }

    this.copied.set(key);
    window.clearTimeout(this.copyTimer);
    this.copyTimer = window.setTimeout(() => this.copied.set(null), 2000);
  }

  private async writeClipboard(value: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const helper = document.createElement('textarea');
      helper.value = value;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.append(helper);
      helper.select();
      const copied = document.execCommand('copy');
      helper.remove();
      return copied;
    }
  }

  protected onHoneypot(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.honeypot.set(target.value);
    }
  }
}
