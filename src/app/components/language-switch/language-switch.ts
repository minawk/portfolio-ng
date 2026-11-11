import { Component, LOCALE_ID, inject } from '@angular/core';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.html',
  styleUrl: './language-switch.scss',
})
export class LanguageSwitch {
  protected readonly currentLocale = inject(LOCALE_ID).toLowerCase().split('-')[0];
}
