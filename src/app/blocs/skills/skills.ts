import { Component } from '@angular/core';
import { SkillIcon, type SkillIconName } from '../../components/skill-icon/skill-icon';

interface Skill {
  name: string;
  icon: SkillIconName;
}

interface SkillGroup {
  title: string;
  skills: readonly Skill[];
}

@Component({
  imports: [SkillIcon],
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
        { name: 'Git', icon: 'git' },
        { name: 'HTML', icon: 'html' },
        { name: 'SCSS', icon: 'scss' },
        { name: 'REST API', icon: 'rest' },
      ],
    },
    {
      title: $localize`:@@skillsAdvanced:Avancé`,
      skills: [
        { name: 'Nest.js', icon: 'nest' },
        { name: 'Node.js', icon: 'node' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'PostgreSQL', icon: 'postgres' },
        { name: 'Docker', icon: 'docker' },
        { name: 'Ionic', icon: 'ionic' },
        { name: 'Capacitor', icon: 'capacitor' },
        { name: 'Vue.js', icon: 'vue' },
        { name: 'Nuxt.js', icon: 'nuxt' },
        { name: 'Socket.io', icon: 'socket' },
      ],
    },
    {
      title: $localize`:@@skillsExploring:Exploration et académique`,
      skills: [
        { name: 'C++', icon: 'cpp' },
        { name: 'SQLite', icon: 'sqlite' },
        { name: 'Redis', icon: 'redis' },
      ],
    },
  ];
}
