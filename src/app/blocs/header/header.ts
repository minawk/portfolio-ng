import { NgOptimizedImage } from '@angular/common';
import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Icon } from '../../components/icon/icon';
import { LanguageSwitch } from '../../components/language-switch/language-switch';
import { ThemeToggle } from '../../components/theme-toggle/theme-toggle';

@Component({
  imports: [Icon, LanguageSwitch, NgOptimizedImage, ThemeToggle],
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly destroyRef = inject(DestroyRef);
  private readonly menu = viewChild<ElementRef<HTMLElement>>('menu');

  protected readonly menuOpen = signal(false);
  protected readonly hash = signal('');
  protected readonly openMenuLabel = $localize`:@@navOpenMenu:Ouvrir le menu`;
  protected readonly closeMenuLabel = $localize`:@@navCloseMenu:Fermer le menu`;
  protected readonly sectionLinks = [
    { id: 'hero', label: $localize`:@@navHome:Accueil` },
    { id: 'about', label: $localize`:@@navAbout:À propos` },
    { id: 'skills', label: $localize`:@@navSkills:Compétences` },
    { id: 'experience', label: $localize`:@@navExperience:Expérience` },
    { id: 'projects', label: $localize`:@@navProjects:Projets` },
    { id: 'contact', label: $localize`:@@navContact:Contact` },
  ];

  constructor() {
    afterNextRender(() => {
      const readHash = () => this.hash.set(window.location.hash.replace('#', ''));
      readHash();
      window.addEventListener('hashchange', readHash);
      this.destroyRef.onDestroy(() => window.removeEventListener('hashchange', readHash));
    });
  }

  protected isCurrent(id: string): boolean {
    const hash = this.hash();
    return hash ? hash === id : id === 'hero';
  }

  protected onMenuToggle(event: Event): void {
    const state = 'newState' in event ? event.newState : 'closed';
    this.menuOpen.set(state === 'open');
  }

  protected closeMenu(): void {
    const menu = this.menu()?.nativeElement;
    if (menu?.matches(':popover-open')) {
      menu.hidePopover();
    }
  }
}
