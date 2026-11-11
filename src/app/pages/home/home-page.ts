import { afterNextRender, Component, ElementRef, inject } from '@angular/core';
import { About } from '../../blocs/about/about';
import { Contact } from '../../blocs/contact/contact';
import { Experience } from '../../blocs/experience/experience';
import { Github } from '../../blocs/github/github';
import { Hero } from '../../blocs/hero/hero';
import { Projects } from '../../blocs/projects/projects';
import { Skills } from '../../blocs/skills/skills';
import { revealOnScroll } from '../../utils/reveal-on-scroll';

@Component({
  imports: [Hero, About, Skills, Experience, Projects, Github, Contact],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
  host: {
    class: 'shell',
  },
})
export class HomePage {
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    afterNextRender(() => {
      revealOnScroll(this.host.nativeElement);
    });
  }
}
