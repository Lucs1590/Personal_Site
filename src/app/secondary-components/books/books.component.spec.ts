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
        expect(compiled.textContent).toContain(component.currentBook.title);
    });

    it('should render all read books', () => {
        const bookCards = fixture.debugElement.queryAll(By.css('.book-card'));
        expect(bookCards.length).toBe(component.readBooks.length);
    });

    it('should display author of the week', () => {
        const authorEl = fixture.nativeElement.querySelector('.author-name');
        expect(authorEl?.textContent).toContain(component.authorOfWeek.name);
    });
});
