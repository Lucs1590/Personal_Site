import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService, TranslateDirective } from '@ngx-translate/core';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { MenuItem } from 'src/app/models/menu-item.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateDirective, RouterLink, RouterLinkActive, AsyncPipe]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  utilsService = inject(UtilsService);
  private translate = inject(TranslateService);
  private router = inject(Router);
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private cdr = inject(ChangeDetectorRef);

  mobile = false;
  itemsList: MenuItem[] = [];
  menuOpen = false;
  isNavHidden = false;
  isSticky = false;

  private readonly destroy$ = new Subject<void>();
  private lastScrollY = 0;
  private scrollUnlisten: (() => void) | null = null;
  private readonly scrollThreshold = 8;
  private readonly stickyThreshold = 60;

  constructor() {
    const translate = this.translate;

    translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refreshMenu();
      });
  }

  async ngOnInit(): Promise<void> {
    this.refreshMenu();
    await this.utilsService.setLanguage();
    this.refreshMenu();
  }

  ngAfterViewInit(): void {
    this.bindScrollListener();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.scrollUnlisten) {
      this.scrollUnlisten();
      this.scrollUnlisten = null;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const target = event.target as Window;
    this.mobile = target.innerWidth <= 991;
    this.filterItems();
    if (!this.mobile && this.menuOpen) {
      this.menuOpen = false;
    }
    this.cdr.markForCheck();
  }

  @HostListener('window:keydown.escape')
  onEscKey(): void {
    if (this.menuOpen) {
      this.menuOpen = false;
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.menuOpen && !this.el.nativeElement.contains(event.target)) {
      this.menuOpen = false;
      this.cdr.markForCheck();
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.cdr.markForCheck();
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.cdr.markForCheck();
  }

  private bindScrollListener(): void {
    const scrollContainer = this.getScrollContainer();

    // Initialise state from the current scroll position so that a page that
    // loads (or is restored) already scrolled past a threshold starts with the
    // correct sticky / hidden state, rather than waiting for the first event.
    const initialY = this.readScrollY(scrollContainer);
    this.lastScrollY = initialY;
    this.isSticky = initialY > this.stickyThreshold;
    this.cdr.markForCheck();

    this.scrollUnlisten = this.renderer.listen(scrollContainer, 'scroll', () => {
      const currentY = this.readScrollY(scrollContainer);

      const delta = currentY - this.lastScrollY;
      if (Math.abs(delta) >= this.scrollThreshold) {
        this.isNavHidden = delta > 0 && currentY > 80;
        this.isSticky = currentY > this.stickyThreshold;
        this.lastScrollY = currentY;
        this.cdr.markForCheck();
      }
    });
  }

  private readScrollY(container: HTMLElement | Window): number {
    return container === window
      ? window.scrollY ?? 0
      : (container as HTMLElement).scrollTop;
  }

  private getScrollContainer(): HTMLElement | Window {
    let parent = this.el.nativeElement.parentElement as HTMLElement | null;
    while (parent && parent !== document.documentElement) {
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        return parent;
      }
      parent = parent.parentElement;
    }
    return window;
  }

  private refreshMenu(): void {
    this.defineMenu();
    this.filterItems();
    this.cdr.markForCheck();
  }

  private defineMenu(): void {
    this.itemsList = [
      {
        name: firstValueFrom(this.translate.get('nav.home')),
        ref: ['/home'],
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
      },
      {
        name: firstValueFrom(this.translate.get('nav.books')),
        ref: ['/books'],
        mobile: true,
        desktop: true
      },
      {
        name: firstValueFrom(this.translate.get('nav.presentations')),
        ref: ['/presentations'],
        mobile: true,
        desktop: true
      },
      {
        name: firstValueFrom(this.translate.get('nav.contact')),
        ref: ['/contact'],
        mobile: true,
        desktop: true
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

  trackByItemRef(index: number, item: MenuItem): string {
    return item.ref.join('/');
  }
}
