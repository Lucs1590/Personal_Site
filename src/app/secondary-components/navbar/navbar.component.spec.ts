import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateNoOpLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

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
      declarations: [NavbarComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateNoOpLoader
          }
        })
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
});
