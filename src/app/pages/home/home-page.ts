import { Component } from '@angular/core';
import { About } from '../../blocs/about/about';
import { Experience } from '../../blocs/experience/experience';
import { Hero } from '../../blocs/hero/hero';
import { Skills } from '../../blocs/skills/skills';

@Component({
  imports: [Hero, About, Skills, Experience],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly sectionIds = ['education', 'projects', 'langues', 'contact'];
}
