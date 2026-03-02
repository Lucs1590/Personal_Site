import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';

import { PresentationsComponent } from './presentations.component';
import { SeoService } from 'src/app/services/seo.service';

registerLocaleData(localePt);

describe('PresentationsComponent', () => {
  let component: PresentationsComponent;
  let fixture: ComponentFixture<PresentationsComponent>;
  const seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetadata']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationsComponent],
      imports: [TranslateModule.forRoot(), BrowserModule],
      providers: [{ provide: SeoService, useValue: seoServiceSpy }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load presentations from static data', () => {
    expect(component.presentations.length).toBeGreaterThan(0);
  });

  it('should sort presentations by date descending', () => {
    const dates = component.presentations.map(p => new Date(p.date).getTime());
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1]).toBeGreaterThanOrEqual(dates[i]);
    }
  });

  it('should track by id', () => {
    const event = component.presentations[0];
    expect(component.trackById(0, event)).toEqual(event.id);
  });

  it('should generate YouTube embed URL', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const safe = component.getSafeEmbedUrl(url);
    expect(safe).toBeTruthy();
  });

  it('should identify YouTube and Vimeo URLs', () => {
    expect(component.isYouTubeOrVimeo('https://www.youtube.com/watch?v=abc')).toBeTrue();
    expect(component.isYouTubeOrVimeo('https://youtu.be/abc')).toBeTrue();
    expect(component.isYouTubeOrVimeo('https://vimeo.com/123456')).toBeTrue();
    expect(component.isYouTubeOrVimeo('https://example.com/video.mp4')).toBeFalse();
  });

  it('should call SEO service when not embedded', () => {
    component.isEmbedded = false;
    component.ngOnInit();
    expect(seoServiceSpy.updateMetadata).toHaveBeenCalled();
  });

  it('should not call SEO service when embedded', () => {
    seoServiceSpy.updateMetadata.calls.reset();
    component.isEmbedded = true;
    component.ngOnInit();
    expect(seoServiceSpy.updateMetadata).not.toHaveBeenCalled();
  });

  it('should have valid visibility values when set', () => {
    component.presentations.forEach(p => {
      if (p.visibility !== undefined) {
        expect(['public', 'private']).toContain(p.visibility);
      }
    });
  });

  it('should build item i18n key from event id and field', () => {
    const event = component.presentations[0];
    expect(component.itemKey(event, 'title')).toBe(`presentations.items.${event.id}.title`);
    expect(component.itemKey(event, 'description')).toBe(`presentations.items.${event.id}.description`);
  });

  it('should default currentLocale to en-US', () => {
    expect(component.currentLocale).toBe('en-US');
  });

  it('should update currentLocale to pt-BR when language changes to pt', () => {
    const translate = TestBed.inject(TranslateService);
    translate.use('pt');
    expect(component.currentLocale).toBe('pt-BR');
  });

  it('should not have translatable text (title/description/eventName) in static data', () => {
    component.presentations.forEach(p => {
      expect(p.title).toBeUndefined();
      expect(p.description).toBeUndefined();
      expect(p.eventName).toBeUndefined();
    });
  });
});
