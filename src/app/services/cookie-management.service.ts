import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieManagementService {

  constructor(private cookieService: CookieService) {}

  checkConsent(): boolean {
    const consentGiven = this.cookieService.get('cookieConsent');
    return consentGiven === 'true';
  }

  acceptCookies(): void {
    this.cookieService.set('cookieConsent', 'true', { expires: 365 });
  }

  declineCookies(): void {
    this.cookieService.set('cookieConsent', 'false', { expires: 365 });
  }
}
