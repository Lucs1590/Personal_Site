import { Component, OnInit } from '@angular/core';
import { CookieManagementService } from '../services/cookie-management.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  showConsentBanner: boolean = true;

  constructor(private cookieManagementService: CookieManagementService) {}

  ngOnInit(): void {
    this.checkConsent();
  }

  ngOnInit(): void {
    if (!this.cookieManagementService.checkConsent()) {
      this.showConsentBanner = true;
    } else {
      this.showConsentBanner = false;
    }
  }

  checkConsent(): void {
    // This method is now handled within ngOnInit and updated to use CookieManagementService
  }

  acceptCookies(): void {
    this.cookieManagementService.acceptCookies();
    this.showConsentBanner = false;
  }

  declineCookies(): void {
    this.cookieManagementService.declineCookies();
    this.showConsentBanner = false;
  }
}
