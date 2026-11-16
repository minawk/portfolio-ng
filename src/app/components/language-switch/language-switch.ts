import { Component, LOCALE_ID, inject } from '@angular/core';

/**
 * Links between the French and English builds.
 * The chosen language is stored by the inline script in src/index.html,
 * which runs on every page load, so it does not depend on hydration.
 */
@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.scss',
})
export class LanguageSwitch {
  protected readonly currentLocale = inject(LOCALE_ID).toLowerCase().split('-')[0];
}
