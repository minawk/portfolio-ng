import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Icon } from '../../components/icon/icon';

@Component({
  imports: [Icon, NgOptimizedImage],
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly personalProjects = [
    {
      title: 'Gantt RO',
      href: 'https://gantt-ro.netlify.app',
      image: 'projects/gantt-ro.webp',
      width: 960,
      height: 470,
    },
    {
      title: 'Affectation RO',
      href: 'https://affectation-ro.minawk.dev/',
      image: 'projects/affectation-ro.webp',
      width: 960,
      height: 482,
    },
    {
      title: 'Simple Class Diagram',
      href: 'https://class-diagram.netlify.app',
      image: 'projects/class-diagram.webp',
      width: 960,
      height: 464,
    },
  ];
}
