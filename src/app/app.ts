import { DOCUMENT } from '@angular/common';
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
  private readonly document = inject(DOCUMENT);
  private readonly documentTitle = inject(Title);
  private readonly meta = inject(Meta);

  constructor() {
    const title = $localize`:@@pageTitle:Benjamina Randrianasolo - Portfolio`;
    const description = $localize`:@@pageDescription:Portfolio de Benjamina Randrianasolo, développeur Angular à Antananarivo.`;

    this.documentTitle.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.addStructuredData(title, description);
  }

  private addStructuredData(title: string, description: string): void {
    if (this.document.getElementById('structured-data')) {
      return;
    }

    const isEnglish = $localize.locale === 'en';
    const pageUrl = isEnglish ? 'https://minawk.dev/en/' : 'https://minawk.dev/';
    const personId = 'https://minawk.dev/#person';
    const script = this.document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Person',
          '@id': personId,
          name: 'Benjamina Randrianasolo',
          jobTitle: $localize`:@@heroRole:Développeur Angular`,
          description,
          url: 'https://minawk.dev/',
          image: 'https://minawk.dev/portrait.webp',
          email: 'mailto:contact@minawk.dev',
          telephone: '+261343918756',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Antananarivo',
            addressCountry: 'MG',
          },
          sameAs: ['https://www.linkedin.com/in/minawk/', 'https://github.com/minawk'],
          knowsAbout: ['Angular', 'Nest.js', 'TypeScript'],
        },
        {
          '@type': 'WebSite',
          '@id': 'https://minawk.dev/#website',
          url: pageUrl,
          name: title,
          description,
          inLanguage: isEnglish ? 'en' : 'fr',
          author: { '@id': personId },
        },
      ],
    });
    this.document.head.appendChild(script);
  }
}
