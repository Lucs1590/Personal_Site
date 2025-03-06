import { Component, HostListener, OnInit, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent implements OnInit {
  mobile: Signal<boolean> = signal(false);
  itemsList: Signal<{ name: Promise<string> | string; ref: string[]; mobile: boolean; desktop: boolean }[]> = signal([]);

  constructor(
    public utils: UtilsService,
    private translate: TranslateService,
    private router: Router
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
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobile.set(event.target.innerWidth <= 991);
    this.filterItems();
  }

  private async defineMenu() {
    this.itemsList.set([
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
    ]);
  }

  private filterItems() {
    this.itemsList.set(this.mobile() ? this.itemsList().filter(item => item.mobile) : this.itemsList().filter(item => item.desktop));
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
