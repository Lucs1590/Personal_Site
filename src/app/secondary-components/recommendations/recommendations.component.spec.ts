import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { RecommendationsComponent } from './recommendations.component';
import { SeoService } from 'src/app/services/seo.service';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;
  const seoServiceSpy = jasmine.createSpyObj('SeoService', ['updateMetadata']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendationsComponent ],
      imports: [ TranslateModule.forRoot() ],
      providers: [{ provide: SeoService, useValue: seoServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load recommendations from static data', () => {
    expect(component.recommendations.length).toBeGreaterThan(0);
  });

  it('should truncate long recommendation text', () => {
    const longRec = component.recommendations.find(r => r.recommendationText.length > component.truncateLength);
    if (longRec) {
      expect(component.isTruncatable(longRec)).toBeTrue();
      const displayText = component.getDisplayText(longRec);
      expect(displayText.length).toBeLessThanOrEqual(component.truncateLength + 1);
    }
  });

  it('should expand text when toggled', () => {
    const longRec = component.recommendations.find(r => r.recommendationText.length > component.truncateLength);
    if (longRec) {
      expect(component.isExpanded(longRec.id)).toBeFalse();
      component.toggleExpanded(longRec.id);
      expect(component.isExpanded(longRec.id)).toBeTrue();
      expect(component.getDisplayText(longRec)).toEqual(longRec.recommendationText);
    }
  });

  it('should track by id', () => {
    const rec = component.recommendations[0];
    expect(component.trackById(0, rec)).toEqual(rec.id);
  });
});
