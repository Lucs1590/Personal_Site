import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';

export type ThemeName = 'dark' | 'light';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly storageKey = 'preferred-theme';
  private readonly defaultTheme: ThemeName = 'dark';
  private readonly document = inject(DOCUMENT);

  currentTheme: ThemeName = this.defaultTheme;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) { }

  initializeTheme(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const storedTheme = this.readStoredTheme();
    const fallbackTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : this.defaultTheme;
    const theme = storedTheme ?? fallbackTheme;
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    const nextTheme: ThemeName = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme);
  }

  private applyTheme(theme: ThemeName): void {
    this.currentTheme = theme;
    this.document.documentElement.setAttribute('data-theme', theme);
    this.document.body.classList.remove('theme-dark', 'theme-light');
    this.document.body.classList.add(`theme-${theme}`);
    this.persistTheme(theme);
  }

  private readStoredTheme(): ThemeName | null {
    const stored = localStorage.getItem(this.storageKey);
    return stored === 'dark' || stored === 'light' ? stored : null;
  }

  private persistTheme(theme: ThemeName): void {
    localStorage.setItem(this.storageKey, theme);
  }
}
