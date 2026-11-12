import { DOCUMENT } from '@angular/common';
import { Component, LOCALE_ID, inject } from '@angular/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.scss',
})
export class LanguageSwitch {
  private readonly document = inject(DOCUMENT);
  protected readonly currentLocale = inject(LOCALE_ID).toLowerCase().split('-')[0];

  /**
   * Remembers the chosen language so Netlify's language redirect
   * (see netlify.toml) no longer overrides the visitor's choice.
   */
  protected rememberLanguage(language: 'fr' | 'en'): void {
    this.document.cookie = `nf_lang=${language}; path=/; max-age=31536000; SameSite=Lax`;
  }
}
