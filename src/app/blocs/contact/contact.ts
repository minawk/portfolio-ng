import { Component, signal } from '@angular/core';
import { email, form, FormField, maxLength, required, submit } from '@angular/forms/signals';

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

@Component({
  imports: [FormField],
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly model = signal<ContactMessage>({
    name: '',
    email: '',
    message: '',
  });

  protected readonly sent = signal(false);
  protected readonly sendFailed = signal(false);
  protected readonly contactForm = form(this.model, (path) => {
    required(path.name, { message: $localize`:@@contactNameRequired:Indiquez votre nom.` });
    maxLength(path.name, 120, { message: $localize`:@@contactNameTooLong:Le nom est trop long.` });
    required(path.email, {
      message: $localize`:@@contactEmailRequired:Indiquez votre adresse e-mail.`,
    });
    email(path.email, {
      message: $localize`:@@contactEmailInvalid:Indiquez une adresse e-mail valide.`,
      when: ({ value }) => value().length > 0,
    });
    required(path.message, {
      message: $localize`:@@contactMessageRequired:Écrivez votre message.`,
    });
    maxLength(path.message, 5000, {
      message: $localize`:@@contactMessageTooLong:Le message est trop long.`,
    });
  });

  protected send(event: Event): void {
    event.preventDefault();
    this.sent.set(false);
    this.sendFailed.set(false);
    this.contactForm().markAsTouched();
    void submit(this.contactForm, async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.contactForm().value()),
        });
        if (!response.ok) {
          this.sendFailed.set(true);
          return undefined;
        }
      } catch {
        this.sendFailed.set(true);
        return undefined;
      }

      this.contactForm().reset({ name: '', email: '', message: '' });
      this.sent.set(true);
      return undefined;
    });
  }
}
