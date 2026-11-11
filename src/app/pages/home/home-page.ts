import { Component } from '@angular/core';
import { About } from '../../blocs/about/about';
import { Education } from '../../blocs/education/education';
import { Experience } from '../../blocs/experience/experience';
import { Github } from '../../blocs/github/github';
import { Hero } from '../../blocs/hero/hero';
import { Languages } from '../../blocs/languages/languages';
import { Projects } from '../../blocs/projects/projects';
import { Skills } from '../../blocs/skills/skills';

@Component({
  imports: [Hero, About, Skills, Experience, Education, Projects, Github, Languages],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  protected readonly sectionIds = ['contact'];
}
