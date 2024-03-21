import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mobile = false;
  itemsList: { name: Promise<string> | string; ref: string[]; mobile: boolean; desktop: boolean }[];

  constructor(
    public utils: UtilsService,
    private translate: TranslateService,
    private router: Router,
    private cookieService: CookieService
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.cookieService.set('langPref', event.lang);
      this.defineMenu();
      this.filterItems();
    });
  }

  ngOnInit(): void {
    const langPref = this.cookieService.get('langPref');
    if (langPref) {
      this.utils.currentLang = langPref;
      this.translate.use(langPref);
    }
    this.mobile = window.innerWidth <= 991;
    this.defineMenu();
    this.filterItems();
  }

  defineMenu() {
    this.itemsList = [
      {
        name: firstValueFrom(this.translate.get('nav.home')),
        ref: ['/'],
        mobile: true,
        desktop: true
      },
      {
        name: firstValueFrom(this.translate.get('nav.publications')),
        ref: ['/publications'],
        mobile: true,
        desktop: true
      },
      {
        name: 'Portfolio',
        ref: [''],
        mobile: false,
        desktop: false
      },
      {
        name: firstValueFrom(this.translate.get('nav.hobbies')),
        ref: ['/hobbies'],
        mobile: true,
        desktop: true
      },
    ];
  }

  filterItems() {
    this.itemsList = this.mobile ? this.itemsList?.filter(item => item.mobile) : this.itemsList?.filter(item => item.desktop);
  }

  isActive(route: string[]): boolean {
    if (route[0] === '/') {
      route = ['/home'];
    }
    return this.router.isActive(route[0], true);
  }

}
