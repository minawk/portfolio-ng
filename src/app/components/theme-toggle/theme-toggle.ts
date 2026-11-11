import { Component, computed, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  imports: [Icon],
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggle {
  private readonly themeService = inject(ThemeService);

  protected readonly isDark = computed(() => this.themeService.theme() === 'dark');
  protected readonly lightLabel = $localize`:@@themeLight:Thème clair`;
  protected readonly darkLabel = $localize`:@@themeDark:Thème sombre`;

  protected toggleTheme(): void {
    this.themeService.toggle();
  }
}
