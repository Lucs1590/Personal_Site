import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  showConsentMessage: boolean = false;

  constructor(private cookieService: CookieService) {}

  ngOnInit(): void {
    this.checkCookieConsent();
  }

  checkCookieConsent(): void {
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
```
```html
<div *ngIf="showConsentMessage" class="cookie-consent-container">
  <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
  <button (click)="acceptConsent()">Accept</button>
</div>
```
```css
.cookie-consent-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
  padding: 20px;
  z-index: 1000;
}

.cookie-consent-container p {
  margin: 0 0 20px 0;
}

.cookie-consent-container button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
