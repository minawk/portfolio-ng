import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
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
    const isEnglish = $localize.locale === 'en';
    const pageUrl = isEnglish ? 'https://minawk.dev/en/' : 'https://minawk.dev/';

    this.documentTitle.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.addSocialTags(title, description, pageUrl, isEnglish);
    this.addStructuredData(title, description, pageUrl);
  }

  private addSocialTags(title: string, description: string, pageUrl: string, isEnglish: boolean): void {
    const image = 'https://minawk.dev/og.jpg';
    const tags: MetaDefinition[] = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: pageUrl },
      { property: 'og:image', content: image },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '640' },
      { property: 'og:image:height', content: '640' },
      { property: 'og:image:alt', content: 'Benjamina Randrianasolo' },
      { property: 'og:locale', content: isEnglish ? 'en_US' : 'fr_FR' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    for (const tag of tags) {
      this.meta.updateTag(tag);
    }
  }

  private addStructuredData(title: string, description: string, pageUrl: string): void {
    if (this.document.getElementById('structured-data')) {
      return;
    }

    const isEnglish = pageUrl.endsWith('/en/');
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
          image: 'https://minawk.dev/og.jpg',
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
