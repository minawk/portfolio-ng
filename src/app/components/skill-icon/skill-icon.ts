import { Component, input } from '@angular/core';

export type SkillIconName =
  | 'angular'
  | 'typescript'
  | 'javascript'
  | 'git'
  | 'html'
  | 'scss'
  | 'rest'
  | 'nest'
  | 'node'
  | 'mysql'
  | 'postgres'
  | 'docker'
  | 'ionic'
  | 'capacitor'
  | 'vue'
  | 'nuxt'
  | 'socket'
  | 'cpp'
  | 'sqlite'
  | 'redis';

@Component({
  selector: 'app-skill-icon',
  templateUrl: './skill-icon.html',
  styleUrl: './skill-icon.scss',
})
export class SkillIcon {
  readonly name = input.required<SkillIconName>();
}
