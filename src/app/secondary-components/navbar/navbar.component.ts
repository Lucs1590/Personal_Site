import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';

interface MenuItem {
  name: Promise<string> | string;
  ref: string[];
  mobile: boolean;
  desktop: boolean;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent implements OnInit, OnDestroy {
  mobile = false;
  itemsList: MenuItem[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    public utilsService: UtilsService,
    private translate: TranslateService,
    private router: Router
  ) {
    translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: LangChangeEvent) => {
        this.defineMenu();
        this.filterItems();
      });
  }

  async ngOnInit(): Promise<void> {
    await this.utilsService.setLanguage();
    this.defineMenu();
    this.filterItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const target = event.target as Window;
    this.mobile = target.innerWidth <= 991;
    this.filterItems();
  }

  private defineMenu(): void {
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

  private filterItems(): void {
    if (!this.itemsList) return;
    this.itemsList = this.mobile 
      ? this.itemsList.filter(item => item.mobile) 
      : this.itemsList.filter(item => item.desktop);
  }

  isActive(route: string[]): boolean {
    const normalizedRoute = route[0] === '/' ? ['/home'] : route;
    return this.router.isActive(
      this.router.createUrlTree(normalizedRoute),
      {
        paths: 'exact',
        queryParams: 'exact',
        fragment: 'ignored',
        matrixParams: 'ignored'
      }
    );
  }

  trackByItemRef(index: number, item: MenuItem): string {
    return item.ref.join('/');
  }
}
