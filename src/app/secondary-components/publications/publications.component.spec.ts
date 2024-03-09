import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PublicationsComponent } from './publications.component';

describe('PublicationsComponent', () => {
  let component: PublicationsComponent;
  let fixture: ComponentFixture<PublicationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationsComponent],
      providers: [HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { ApiService } from 'src/app/services/api.service';
import { Publication } from 'src/app/models/publication.model';

describe('PublicationsComponent', () => {
  let component: PublicationsComponent;
  let fixture: ComponentFixture<PublicationsComponent>;
  let mockApiService: Partial<ApiService>;
  let mockActivatedRoute;

  beforeEach(waitForAsync(() => {
    mockApiService = {
      getAllPublications: jasmine.createSpy().and.returnValue(of([
        { title: 'Test Blog Publication', categories: ['test'], publicationDate: new Date() }
      ])),
      getAllSciPublications: jasmine.createSpy().and.returnValue([
        { title: 'Test Sci Publication', categories: ['test'], publicationDate: new Date() }
      ])
    };

    mockActivatedRoute = {
      queryParams: of({})
    };

    TestBed.configureTestingModule({
      declarations: [PublicationsComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter publications by query string when present', () => {
    mockActivatedRoute.queryParams = of({ search: 'test' });
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.blogPublications.length).toBe(1);
    expect(component.sciPublications.length).toBe(1);
    expect(component.blogPublications[0].title).toContain('Test Blog Publication');
    expect(component.sciPublications[0].title).toContain('Test Sci Publication');
  });

  it('should not filter publications when query string is absent', () => {
    mockActivatedRoute.queryParams = of({});
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.blogPublications.length).toBe(1);
    expect(component.sciPublications.length).toBe(1);
  });

  it('should display "no publications found" message when no publications match the search criteria', () => {
    mockActivatedRoute.queryParams = of({ search: 'nonexistent' });
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.blogPublications.length).toBe(0);
    expect(component.sciPublications.length).toBe(0);
  });
});
