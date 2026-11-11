import { Component } from '@angular/core';
import { Icon, type IconName } from '../../components/icon/icon';

interface Skill {
  name: string;
  icon: IconName;
}

interface SkillGroup {
  title: string;
  skills: readonly Skill[];
}

@Component({
  imports: [Icon],
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly groups: readonly SkillGroup[] = [
    {
      title: $localize`:@@skillsExpert:Expert`,
      skills: [
        { name: 'Angular', icon: 'angular' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'Nest.js', icon: 'nest' },
        { name: 'Node.js', icon: 'node' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'Git', icon: 'git' },
        { name: 'HTML', icon: 'html' },
        { name: 'SCSS', icon: 'scss' },
        { name: 'REST API', icon: 'rest' },
      ],
    },
    {
      title: $localize`:@@skillsAdvanced:Avancé`,
      skills: [
        { name: 'PostgreSQL', icon: 'postgres' },
        { name: 'Docker', icon: 'docker' },
        { name: 'Ionic', icon: 'ionic' },
        { name: 'Capacitor', icon: 'capacitor' },
        { name: 'Vue.js', icon: 'vue' },
        { name: 'Nuxt.js', icon: 'nuxt' },
        { name: 'Socket.io', icon: 'socket' },
        { name: 'Linux', icon: 'linux' },
        { name: 'UML', icon: 'uml' },
        { name: 'Agile', icon: 'agile' },
      ],
    },
    {
      title: $localize`:@@skillsExploring:Exploration et académique`,
      skills: [
        { name: 'C++', icon: 'cpp' },
        { name: 'Python', icon: 'python' },
        { name: 'SQLite', icon: 'sqlite' },
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'Redis', icon: 'redis' },
        { name: 'GraphQL', icon: 'graphql' },
      ],
    },
  ];
}
