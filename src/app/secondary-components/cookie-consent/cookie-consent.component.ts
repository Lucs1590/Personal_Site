import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  showConsentMessage: boolean = false;

  constructor(
    private cookieService: CookieService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.checkCookieConsent();
  }

  private checkCookieConsent(): void {
    if (!this.cookieService.check('cookieConsent')) {
      this.showConsentMessage = true;
    }
  }

  async acceptConsent(): Promise<void> {
    this.cookieService.set('cookieConsent', 'true', { expires: 365, path: '/' });
    this.showConsentMessage = false;
    await this.utilsService.setLanguage();
  }

  declineConsent(): void {
    this.showConsentMessage = false;
  }
}
