import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieManagementService } from './cookie-management.service';

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

  toggleLanguage(): void {
    this.currentLang = this.currentLang === 'pt' ? 'en' : 'pt';
    this.translate.use(this.currentLang);
    this.cookieService.set('langPref', this.currentLang);
  }

  useLanguage(): void {
    if (this.cookieManagementService.checkConsent()) {
      this.toggleLanguage();
    }
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
