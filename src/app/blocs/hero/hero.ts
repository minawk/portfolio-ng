import { NgOptimizedImage } from '@angular/common';
import { Component, afterNextRender, signal } from '@angular/core';
import { Icon } from '../../components/icon/icon';

@Component({
  imports: [Icon, NgOptimizedImage],
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  /** Touch devices download the CV directly; desktops open it in the browser's PDF viewer. */
  protected readonly mobile = signal(false);

  constructor() {
    afterNextRender(() => {
      this.mobile.set(matchMedia('(hover: none) and (pointer: coarse)').matches);
    });
  }
}
