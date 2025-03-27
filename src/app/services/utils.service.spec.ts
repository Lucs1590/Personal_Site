import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        })
      ],
      providers: [TranslateService]
    });
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addUtmSource', () => {
    it('should add utm_source parameter to URLs without existing parameters', () => {
      const url = 'https://example.com';
      const result = service.addUtmSource(url);
      expect(result).toBe('https://example.com?utm_source=https://lucasbrito.com.br');
    });

    it('should add utm_source parameter to URLs with existing parameters', () => {
      const url = 'https://example.com?param=value';
      const result = service.addUtmSource(url);
      expect(result).toBe('https://example.com?param=value&utm_source=https://lucasbrito.com.br');
    });

    it('should not modify mailto links', () => {
      const url = 'mailto:test@example.com';
      const result = service.addUtmSource(url);
      expect(result).toBe(url);
    });
  });
});
