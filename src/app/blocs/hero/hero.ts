import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { Icon } from '../../components/icon/icon';

@Component({
  imports: [Icon, NgOptimizedImage],
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
