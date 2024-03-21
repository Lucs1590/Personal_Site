import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieManagementService {

  constructor(private cookieService: CookieService) { }

  setLanguagePreference(lang: string): void {
    this.cookieService.set('langPref', lang);
  }

  getLanguagePreference(): string {
    return this.cookieService.get('langPref');
  }
}
