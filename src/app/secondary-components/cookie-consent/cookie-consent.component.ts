import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  showConsent: boolean = false;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.checkCookieConsent();
  }

  checkCookieConsent(): void {
    const consent = this.cookieService.get('cookieConsent');
    this.showConsent = !consent;
  }

  acceptCookies(): void {
    this.cookieService.set('cookieConsent', 'true', { expires: 365 });
    this.showConsent = false;
  }
}
