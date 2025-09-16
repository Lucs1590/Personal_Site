import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  currentLang = 'en';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cookieService: CookieService,
    private apiService: ApiService
  ) { }

  useLanguage(): void {
    if (this.currentLang === 'pt') {
      this.currentLang = 'en';
    } else {
      this.currentLang = 'pt';
    }

    this.cookieService.set('langPref', this.currentLang);
    this.translate.use(this.currentLang);
  }

  async setLanguage(): Promise<void> {
    this.translate.setDefaultLang(this.currentLang);

    const langPref = this.cookieService.get('langPref');

    if (langPref) {
      this.translate.setDefaultLang(langPref);
    } else {
      try {
        const ipInfo = await firstValueFrom(this.apiService.getIPInfo());
        const userCountry = ipInfo?.country?.toUpperCase();
        const preferredLang = userCountry === 'BR' ? 'pt' : 'en';

        this.translate.setDefaultLang(preferredLang);
        this.cookieService.set('langPref', preferredLang);
        this.currentLang = preferredLang;
      } catch (error) {
        console.error('Error retrieving IP info:', error);
      }
    }
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }

  addUtmParameters(url: string, source: string = 'lucasbrito-website', medium: string = 'link'): string {
    if (!url || typeof url !== 'string') {
      console.warn('Invalid URL provided');
      return url;
    }

    if (url.startsWith('mailto:')) {
      return url;
    }

    const params = new URLSearchParams({
      utm_source: source,
      utm_medium: medium
    });

    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }
}
