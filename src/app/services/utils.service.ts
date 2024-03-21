import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  currentLang = 'pt';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  useLanguage(): void {
    const consentGiven = this.cookieService.get('cookieConsent');
    if (consentGiven === 'true') {
      if (this.currentLang.match('pt')) {
        this.currentLang = 'en';
        this.translate.use(this.currentLang);
      } else {
        this.currentLang = 'pt';
        this.translate.use(this.currentLang);
      }
      this.cookieService.set('langPref', this.currentLang);
    }
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
