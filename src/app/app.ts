import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor() {
    this.documentTitle.setTitle($localize`:@@pageTitle:Benjamina Randrianasolo - Portfolio`);
  }
}
