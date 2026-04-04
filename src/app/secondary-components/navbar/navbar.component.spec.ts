import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateNoOpLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Renderer2 } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { UtilsService } from 'src/app/services/utils.service';

function simulateKeyboardClick(element: HTMLElement, key = 'Enter'): void {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  element.click();
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockUtilsService: jasmine.SpyObj<UtilsService>;

  beforeEach(async () => {
    mockUtilsService = jasmine.createSpyObj<UtilsService>(
      'UtilsService',
      { setLanguage: Promise.resolve(), useLanguage: undefined },
      { currentLang: 'en' }
    );

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateNoOpLoader
          }
        }),
        NavbarComponent
      ],
      providers: [
        { provide: UtilsService, useValue: mockUtilsService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise with the mobile menu closed', () => {
    expect(component.menuOpen).toBeFalse();
  });

  it('should initialise with navbar visible and not sticky', () => {
    expect(component.isNavHidden).toBeFalse();
    expect(component.isSticky).toBeFalse();
  });

  it('should open the mobile menu when toggleMenu is called', () => {
    component.toggleMenu();
    expect(component.menuOpen).toBeTrue();
  });

  it('should close the mobile menu when toggleMenu is called twice', () => {
    component.toggleMenu();
    component.toggleMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('should close the mobile menu when closeMenu is called', () => {
    component.menuOpen = true;
    component.closeMenu();
    expect(component.menuOpen).toBeFalse();
  });

  it('should close the mobile menu when ESC key is pressed', () => {
    component.menuOpen = true;
    component.onEscKey();
    expect(component.menuOpen).toBeFalse();
  });

  it('should not error when ESC is pressed and menu is already closed', () => {
    component.menuOpen = false;
    expect(() => component.onEscKey()).not.toThrow();
    expect(component.menuOpen).toBeFalse();
  });

  it('should set inert on the mobile menu when closed and remove it when open', () => {
    const mobileMenu: HTMLElement =
      fixture.debugElement.query(By.css('#mobile-menu')).nativeElement;

    // Closed by default — inert must be present (beforeEach already ran detectChanges)
    expect(mobileMenu.hasAttribute('inert')).toBeTrue();

    // Open the menu via toggleMenu() so OnPush CD is properly marked and the DOM updates
    component.toggleMenu();
    fixture.detectChanges();
    expect(mobileMenu.hasAttribute('inert')).toBeFalse();

    // Close again — inert must return
    component.toggleMenu();
    fixture.detectChanges();
    expect(mobileMenu.hasAttribute('inert')).toBeTrue();
  });

  it('should toggle the mobile menu when the hamburger button is activated via keyboard (Enter)', () => {
    const hamburgerBtn: HTMLButtonElement =
      fixture.debugElement.query(By.css('.hamburger-btn')).nativeElement;

    // Pressing Enter/Space on a <button> fires a click event in browsers; replicate that sequence.
    simulateKeyboardClick(hamburgerBtn);
    fixture.detectChanges();
    expect(component.menuOpen).toBeTrue();

    simulateKeyboardClick(hamburgerBtn);
    fixture.detectChanges();
    expect(component.menuOpen).toBeFalse();
  });

  // ── onDocumentClick ────────────────────────────────────────────────────────

  describe('onDocumentClick', () => {
    it('should close the menu when a click occurs outside the navbar', () => {
      component.toggleMenu();
      fixture.detectChanges();

      const outsideEl = document.createElement('div');
      document.body.appendChild(outsideEl);
      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: outsideEl, configurable: true });

      component.onDocumentClick(event);

      expect(component.menuOpen).toBeFalse();
      document.body.removeChild(outsideEl);
    });

    it('should NOT close the menu when a click occurs inside the navbar', () => {
      component.toggleMenu();
      fixture.detectChanges();

      const insideEl: HTMLElement =
        fixture.debugElement.query(By.css('.hamburger-btn')).nativeElement;
      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: insideEl, configurable: true });

      component.onDocumentClick(event);

      expect(component.menuOpen).toBeTrue();
    });

    it('should leave the menu closed when a click occurs outside and the menu is already closed', () => {
      const outsideEl = document.createElement('div');
      document.body.appendChild(outsideEl);
      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: outsideEl, configurable: true });

      component.onDocumentClick(event);

      expect(component.menuOpen).toBeFalse();
      document.body.removeChild(outsideEl);
    });
  });

  // ── onResize ───────────────────────────────────────────────────────────────

  describe('onResize', () => {
    it('should set mobile=true when viewport width is ≤991px', () => {
      component.onResize({ target: { innerWidth: 600 } } as unknown as UIEvent);
      expect(component.mobile).toBeTrue();
    });

    it('should set mobile=false when viewport width is >991px', () => {
      component.onResize({ target: { innerWidth: 600 } } as unknown as UIEvent);
      component.onResize({ target: { innerWidth: 1200 } } as unknown as UIEvent);
      expect(component.mobile).toBeFalse();
    });

    it('should close the open menu when resizing to a desktop viewport', () => {
      component.mobile = true;
      component.toggleMenu();
      expect(component.menuOpen).toBeTrue();

      component.onResize({ target: { innerWidth: 1200 } } as unknown as UIEvent);
      expect(component.menuOpen).toBeFalse();
    });

    it('should leave the menu open when resizing within mobile widths', () => {
      component.mobile = true;
      component.toggleMenu();

      component.onResize({ target: { innerWidth: 400 } } as unknown as UIEvent);
      expect(component.menuOpen).toBeTrue();
    });
  });

  // ── scroll handler (Renderer2.listen stubbed) ──────────────────────────────

  describe('scroll handler', () => {
    let scrollFixture: ComponentFixture<NavbarComponent>;
    let scrollComponent: NavbarComponent;
    let capturedScrollCb: (() => void) | undefined;

    beforeEach(() => {
      scrollFixture = TestBed.createComponent(NavbarComponent);
      scrollComponent = scrollFixture.componentInstance;

      // Spy on Renderer2.listen BEFORE detectChanges so we capture the callback
      // that bindScrollListener (called in ngAfterViewInit) registers.
      const renderer = scrollFixture.componentRef.injector.get(Renderer2);
      spyOn(renderer, 'listen').and.callFake(
        (_target: unknown, event: string, cb: (e: unknown) => void) => {
          if (event === 'scroll') { capturedScrollCb = () => cb(new Event('scroll')); }
          return () => { };
        }
      );

      scrollFixture.detectChanges();

      // Override readScrollY so tests control the reported position without
      // depending on browser/jsdom scroll state.
      (scrollComponent as any).readScrollY = () => 0;
    });

    afterEach(() => {
      scrollFixture.destroy();
    });

    it('should set isSticky=true after scrolling past the sticky threshold (60px)', () => {
      (scrollComponent as any).readScrollY = () => 70;
      capturedScrollCb!();
      expect(scrollComponent.isSticky).toBeTrue();
    });

    it('should clear isSticky when scrolled back below the sticky threshold', () => {
      (scrollComponent as any).readScrollY = () => 70;
      capturedScrollCb!();
      expect(scrollComponent.isSticky).toBeTrue();

      (scrollComponent as any).readScrollY = () => 30;
      capturedScrollCb!();
      expect(scrollComponent.isSticky).toBeFalse();
    });

    it('should set isNavHidden=true when scrolling down past 80px', () => {
      (scrollComponent as any).readScrollY = () => 100;
      capturedScrollCb!();
      expect(scrollComponent.isNavHidden).toBeTrue();
    });

    it('should set isNavHidden=false when scrolling back up', () => {
      (scrollComponent as any).readScrollY = () => 100;
      capturedScrollCb!();
      expect(scrollComponent.isNavHidden).toBeTrue();

      (scrollComponent as any).readScrollY = () => 40;
      capturedScrollCb!();
      expect(scrollComponent.isNavHidden).toBeFalse();
    });

    it('should ignore scroll events smaller than the scroll threshold (8px)', () => {
      (scrollComponent as any).readScrollY = () => 4; // |delta| = 4 < 8
      capturedScrollCb!();
      expect(scrollComponent.isNavHidden).toBeFalse();
      expect(scrollComponent.isSticky).toBeFalse();
    });
  });
});
