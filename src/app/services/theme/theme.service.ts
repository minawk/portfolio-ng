import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, PLATFORM_ID, Service, afterNextRender, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

@Service()
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly themeMode = signal<ThemeMode>('light');

  readonly theme = this.themeMode.asReadonly();

  constructor() {
    if (this.isBrowser) {
      this.setDocumentTheme(this.readPreferredTheme());
    }

    afterNextRender(() => {
      this.themeMode.set(this.readPreferredTheme());
    });
  }

  toggle(): void {
    const nextTheme = this.themeMode() === 'dark' ? 'light' : 'dark';
    this.themeMode.set(nextTheme);
    this.setDocumentTheme(nextTheme);

    if (this.isBrowser) {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    }
  }

  private setDocumentTheme(theme: ThemeMode): void {
    this.document.documentElement.dataset['theme'] = theme;
  }

  private readPreferredTheme(): ThemeMode {
    const applied = this.document.documentElement.dataset['theme'];
    if (applied === 'light' || applied === 'dark') {
      return applied;
    }

    const stored = this.readStoredTheme();
    if (stored) {
      return stored;
    }

    const prefersDark = this.document.defaultView?.matchMedia?.(
      '(prefers-color-scheme: dark)',
    )?.matches;
    return prefersDark ? 'dark' : 'light';
  }

  private readStoredTheme(): ThemeMode | null {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored === 'light' || stored === 'dark' ? stored : null;
    } catch {
      return null;
    }
  }
}
