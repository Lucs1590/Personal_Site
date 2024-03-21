import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieManagementService } from '../cookie-management.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  currentLang = 'pt';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private cookieManagementService: CookieManagementService
  ) { }

  useLanguage(): void {
    if (this.currentLang.match('pt')) {
      this.currentLang = 'en';
      this.translate.use(this.currentLang);
    } else {
      this.currentLang = 'pt';
      this.translate.use(this.currentLang);
    }
    this.cookieManagementService.setLanguagePreference(this.currentLang);
  }

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
