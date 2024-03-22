import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  showConsentMessage: boolean = false;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.checkCookieConsent();
  }

  private checkCookieConsent(): void {
    if (!this.cookieService.check('cookieConsent')) {
      this.showConsentMessage = true;
    }
  }

  acceptConsent(): void {
    this.cookieService.set('cookieConsent', 'true', { expires: 365, path: '/' });
    this.showConsentMessage = false;
  }

  declineConsent(): void {
    this.showConsentMessage = false;
  }
}
