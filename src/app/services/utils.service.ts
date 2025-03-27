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

  addUtmSource(url: string): string {
    if (url.startsWith('mailto:')) {
      return url;
    }

    const utmSource = 'utm_source=https://lucasbrito.com.br';
    const separator = url.includes('?') ? '&' : '?';

    return `${url}${separator}${utmSource}`;
  }
}
