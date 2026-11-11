import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { LanguageSwitch } from './components/language-switch/language-switch';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';

@Component({
  imports: [RouterOutlet, LanguageSwitch, ThemeToggle],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly documentTitle = inject(Title);

  constructor() {
    this.documentTitle.setTitle($localize`:@@pageTitle:Benjamina Randrianasolo - Portfolio`);
  }
}
