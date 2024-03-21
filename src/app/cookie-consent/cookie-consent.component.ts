import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  showConsentBanner = true;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.checkConsent();
  }

  checkConsent(): void {
    const consentGiven = this.cookieService.get('cookieConsent');
    if (consentGiven === 'true') {
      this.showConsentBanner = false;
    }
  }

  acceptCookies(): void {
    this.cookieService.set('cookieConsent', 'true', { expires: 365 });
    this.showConsentBanner = false;
  }

  declineCookies(): void {
    this.cookieService.set('cookieConsent', 'false', { expires: 365 });
    this.showConsentBanner = false;
  }
}
