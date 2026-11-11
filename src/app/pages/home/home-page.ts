import { Component } from '@angular/core';
import { Hero } from '../../blocs/hero/hero';

@Component({
  imports: [Hero],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly sectionIds = [
    'about',
    'skills',
    'experience',
    'education',
    'projects',
    'langues',
    'contact',
  ];
}
