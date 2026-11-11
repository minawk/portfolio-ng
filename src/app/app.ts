import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { Footer } from './blocs/footer/footer';
import { Header } from './blocs/header/header';
import { SkipLink } from './components/skip-link/skip-link';

@Component({
  imports: [RouterOutlet, SkipLink, Header, Footer],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private readonly documentTitle = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    this.documentTitle.setTitle($localize`:@@pageTitle:Benjamina Randrianasolo - Portfolio`);
    this.meta.updateTag({
      name: 'description',
      content: $localize`:@@pageDescription:Portfolio de Benjamina Randrianasolo, développeur fullstack JavaScript / TypeScript à Antananarivo.`,
    });
  }
}
