import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SeoService } from './seo.service';
import { of } from 'rxjs';

describe('SeoService', () => {
  let service: SeoService;
  let metaSpy: jasmine.SpyObj<Meta>;
  let titleSpy: jasmine.SpyObj<Title>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const metaSpyObj = jasmine.createSpyObj('Meta', ['updateTag', 'addTag', 'getTag']);
    const titleSpyObj = jasmine.createSpyObj('Title', ['setTitle']);
    const routerSpyObj = jasmine.createSpyObj('Router', [], {
      events: of({}),
      url: '/home'
    });

    TestBed.configureTestingModule({
      providers: [
        SeoService,
        { provide: Meta, useValue: metaSpyObj },
        { provide: Title, useValue: titleSpyObj },
        { provide: Router, useValue: routerSpyObj }
      ]
    });

    service = TestBed.inject(SeoService);
    metaSpy = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
    titleSpy = TestBed.inject(Title) as jasmine.SpyObj<Title>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update metadata with provided values', () => {
    const metadata = {
      title: 'Test Page',
      description: 'Test Description',
      keywords: 'test, page',
      image: 'https://example.com/image.png'
    };

    service.updateMetadata(metadata);

    expect(titleSpy.setTitle).toHaveBeenCalledWith('Test Page');
    expect(metaSpy.updateTag).toHaveBeenCalledWith(
      jasmine.objectContaining({ name: 'description', content: 'Test Description' })
    );
    expect(metaSpy.updateTag).toHaveBeenCalledWith(
      jasmine.objectContaining({ property: 'og:title', content: 'Test Page' })
    );
  });

  it('should initialize default metadata', () => {
    service.initializeDefaultMetadata();

    expect(titleSpy.setTitle).toHaveBeenCalled();
    expect(metaSpy.updateTag).toHaveBeenCalled();
  });
});
