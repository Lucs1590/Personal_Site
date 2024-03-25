import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from '../../services/utils.service';
import { CookieConsentComponent } from './cookie-consent.component';

// Mock services
class MockCookieService {
  check(key: string): boolean { return false; }
  get(key: string): string { return ''; }
  set(key: string, value: string, options?: object): void {}
}

class MockUtilsService {
  setLanguage(): Promise<void> { return Promise.resolve(); }
}

describe('CookieConsentComponent', () => {
  let component: CookieConsentComponent;
  let fixture: ComponentFixture<CookieConsentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieConsentComponent ],
      providers: [
        { provide: CookieService, useClass: MockCookieService },
        { provide: UtilsService, useClass: MockUtilsService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Tests will be added here

});