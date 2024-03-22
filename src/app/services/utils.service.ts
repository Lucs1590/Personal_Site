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
    if (this.currentLang.match('pt')) {
      this.currentLang = 'en';
      this.translate.use(this.currentLang);
    } else {
      this.currentLang = 'pt';
      this.translate.use(this.currentLang);
    }
    if (this.cookieService.check('cookieConsent') && this.cookieService.get('cookieConsent') === 'true') {
      this.cookieService.set('langPref', this.currentLang);
    }
  }


  async setLanguage(): Promise<void> {
    this.translate.setDefaultLang(this.currentLang);

    if (this.cookieService.check('cookieConsent') && this.cookieService.get('cookieConsent') === 'true') {
      const langPref = this.cookieService.get('langPref');

      if (langPref) {
        this.translate.setDefaultLang(langPref);
      } else {
        try {
          const ipInfo = await firstValueFrom(this.apiService.getIPInfo());
          const userCountry = ipInfo?.country?.toUpperCase();
          this.translate.setDefaultLang(userCountry === 'BR' ? 'pt' : 'en');
        } catch (error) {
          console.error('Error retrieving IP info:', error);
          this.translate.setDefaultLang('en');
        }
      }

    }
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
