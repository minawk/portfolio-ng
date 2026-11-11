import { Component } from '@angular/core';
import { LanguageSwitch } from '../../components/language-switch/language-switch';
import { ThemeToggle } from '../../components/theme-toggle/theme-toggle';

@Component({
  imports: [LanguageSwitch, ThemeToggle],
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly sectionLinks = [
    { id: 'hero', label: $localize`:@@navHome:Accueil` },
    { id: 'about', label: $localize`:@@navAbout:À propos` },
    { id: 'skills', label: $localize`:@@navSkills:Compétences` },
    { id: 'experience', label: $localize`:@@navExperience:Expérience` },
    { id: 'education', label: $localize`:@@navEducation:Formation` },
    { id: 'projects', label: $localize`:@@navProjects:Projets` },
    { id: 'langues', label: $localize`:@@navLanguages:Langues` },
    { id: 'contact', label: $localize`:@@navContact:Contact` },
  ];
}
