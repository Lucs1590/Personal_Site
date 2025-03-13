import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import * as AppActions from '../../store/app.actions';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  mobile = false;
  itemsList: { name: Promise<string> | string; ref: string[]; mobile: boolean; desktop: boolean }[];

  constructor(
    public utils: UtilsService,
    private translate: TranslateService,
    private router: Router,
    private store: Store
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.defineMenu();
      this.filterItems();
    });
  }

  async ngOnInit(): Promise<void> {
    await this.utils.setLanguage();
    this.defineMenu();
    this.filterItems();
    this.store.dispatch(AppActions.loadMenuItems());
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile = event.target.innerWidth <= 991;
    this.filterItems();
  }

  private async defineMenu() {
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
        name: firstValueFrom(this.translate.get('nav.portfolio')),
        ref: ['/portfolio'],
        mobile: false,
        desktop: false
      }
    ];
  }

  private filterItems() {
    this.itemsList = this.mobile ? this.itemsList?.filter(item => item.mobile) : this.itemsList?.filter(item => item.desktop);
  }

  isActive(route: string[]): boolean {
    if (route[0] === '/') {
      route = ['/home'];
    }
    return this.router.isActive(
      this.router.createUrlTree(route),
      {
        paths: 'exact',
        queryParams: 'exact',
        fragment: 'ignored',
        matrixParams: 'ignored'
      }
    );
  }
}
