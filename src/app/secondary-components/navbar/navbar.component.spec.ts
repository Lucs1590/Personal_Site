import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateNoOpLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
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

  it('should toggle the mobile menu when the hamburger button is clicked (Enter/Space trigger a click on a native button)', () => {
    const hamburger: HTMLButtonElement = fixture.nativeElement.querySelector('.hamburger-btn');

    hamburger.click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeTrue();

    hamburger.click();
    fixture.detectChanges();
    expect(component.menuOpen).toBeFalse();
  });
});
