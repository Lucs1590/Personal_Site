import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { By } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SeoService } from 'src/app/services/seo.service';
import { of } from 'rxjs';

describe('BooksComponent', () => {
    let component: BooksComponent;
    let fixture: ComponentFixture<BooksComponent>;
    let mockApiService: jasmine.SpyObj<ApiService>;
    let mockNgxLoader: jasmine.SpyObj<NgxUiLoaderService>;
    let mockSeoService: jasmine.SpyObj<SeoService>;

    beforeEach(async () => {
        mockApiService = jasmine.createSpyObj('ApiService', ['fetchBooksFromLocal']);
        mockNgxLoader = jasmine.createSpyObj('NgxUiLoaderService', ['start', 'stop']);
        mockSeoService = jasmine.createSpyObj('SeoService', ['updateMetadata']);

        // Mock the fetchBooksFromLocal to return empty array by default
        mockApiService.fetchBooksFromLocal.and.returnValue(of([]));

        await TestBed.configureTestingModule({
            declarations: [BooksComponent],
            providers: [
                { provide: ApiService, useValue: mockApiService },
                { provide: NgxUiLoaderService, useValue: mockNgxLoader },
                { provide: SeoService, useValue: mockSeoService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(BooksComponent);
        component = fixture.componentInstance;
        // Don't call detectChanges here to avoid triggering ngOnInit
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call fetchBooksFromLocal on init', async () => {
        await component.ngOnInit();
        expect(mockApiService.fetchBooksFromLocal).toHaveBeenCalled();
        expect(mockNgxLoader.start).toHaveBeenCalled();
        expect(mockNgxLoader.stop).toHaveBeenCalled();
        expect(mockSeoService.updateMetadata).toHaveBeenCalled();
    });

    it('should load books from local JSON and populate arrays correctly', async () => {
        const mockBooks = [
            {
                author: 'Author 1',
                title: 'Currently Reading Book',
                rating: 4,
                shelves: ['currently-reading'],
                cover: 'cover1.jpg',
                description: 'Description 1'
            },
            {
                author: 'Author 2',
                title: 'Read Book 1',
                rating: 5,
                shelves: ['read'],
                cover: 'cover2.jpg',
                description: 'Description 2'
            },
            {
                author: 'Author 3',
                title: 'Read Book 2',
                rating: 3,
                shelves: ['read'],
                cover: 'cover3.jpg',
                description: 'Description 3'
            }
        ];

        mockApiService.fetchBooksFromLocal.and.returnValue(of(mockBooks as any));

        await component.ngOnInit();

        expect(component.books.length).toBe(3);
        expect(component.currentlyReadingBooks.length).toBe(1);
        expect(component.currentlyReadingBooks[0].title).toBe('Currently Reading Book');
        expect(component.filteredReadBooks.length).toBe(2);
    });

    it('should display the current book title', async () => {
        await component.ngOnInit();
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.textContent).toContain(component.currentBook.title || '');
    });

    it('should render all read books', async () => {
        await component.ngOnInit();
        fixture.detectChanges();
        const bookCards = fixture.debugElement.queryAll(By.css('.book-card'));
        expect(bookCards.length).toBe(component.filteredReadBooks.length);
    });

    it('should handle carousel navigation', () => {
        component.currentlyReadingBooks = [
            { title: 'Book 1', cover: 'cover1.jpg' },
            { title: 'Book 2', cover: 'cover2.jpg' }
        ];
        component.currentCarouselIndex = 0;
        
        component.nextBook();
        expect(component.currentCarouselIndex).toBe(1);
        
        component.previousBook();
        expect(component.currentCarouselIndex).toBe(0);
    });

    it('should return current book from carousel', () => {
        component.currentlyReadingBooks = [
            { title: 'Book 1', cover: 'cover1.jpg' },
            { title: 'Book 2', cover: 'cover2.jpg' }
        ];
        component.currentCarouselIndex = 0;
        
        expect(component.currentBook.title).toBe('Book 1');
        
        component.currentCarouselIndex = 1;
        expect(component.currentBook.title).toBe('Book 2');
    });

    it('should navigate to specific book using goToBook', () => {
        component.currentlyReadingBooks = [
            { title: 'Book 1', cover: 'cover1.jpg' },
            { title: 'Book 2', cover: 'cover2.jpg' },
            { title: 'Book 3', cover: 'cover3.jpg' }
        ];
        component.currentCarouselIndex = 0;
        
        component.goToBook(2);
        expect(component.currentCarouselIndex).toBe(2);
        
        // Should not change if index is out of bounds
        component.goToBook(5);
        expect(component.currentCarouselIndex).toBe(2);
        
        component.goToBook(-1);
        expect(component.currentCarouselIndex).toBe(2);
    });

    it('should wrap carousel navigation at boundaries', () => {
        component.currentlyReadingBooks = [
            { title: 'Book 1', cover: 'cover1.jpg' },
            { title: 'Book 2', cover: 'cover2.jpg' },
            { title: 'Book 3', cover: 'cover3.jpg' }
        ];
        
        // Test wrapping forward at the end
        component.currentCarouselIndex = 2;
        component.nextBook();
        expect(component.currentCarouselIndex).toBe(0);
        
        // Test wrapping backward at the start
        component.currentCarouselIndex = 0;
        component.previousBook();
        expect(component.currentCarouselIndex).toBe(2);
    });
});
