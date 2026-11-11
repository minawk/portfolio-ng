import { Component, input } from '@angular/core';

export type IconName =
  | 'menu'
  | 'close'
  | 'sun'
  | 'moon'
  | 'download'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'copy'
  | 'send'
  | 'spinner'
  | 'person'
  | 'graduation'
  | 'globe'
  | 'grid'
  | 'briefcase'
  | 'folder'
  | 'github'
  | 'linkedin'
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
  | 'python'
  | 'sqlite'
  | 'mongodb'
  | 'redis'
  | 'graphql'
  | 'linux'
  | 'uml'
  | 'agile';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styleUrl: './icon.scss',
})
export class Icon {
  readonly name = input.required<IconName>();
}
