import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly skills = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML/CSS',
    'Vue.js',
    'Nest.js',
    'Node.js',
    'Ionic/Capacitor',
    'MySQL',
    'Git',
    'Docker',
  ];
}
