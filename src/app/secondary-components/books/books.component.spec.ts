import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { By } from '@angular/platform-browser';

describe('BooksComponent', () => {
    let component: BooksComponent;
    let fixture: ComponentFixture<BooksComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BooksComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(BooksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the current book title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.textContent).toContain(component.currentBook.title || '');
    });

    it('should render all read books', () => {
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
