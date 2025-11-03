import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Book } from 'src/app/models/book.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css'],
    standalone: false
})
export class BooksComponent implements OnInit, OnDestroy {
    activeTab: 'books' | 'audiobooks' = 'books';

    currentBook: Partial<Book> = {
        title: 'The Last Thing He Told Me',
        author: 'Laura Dave',
        cover: 'assets/the-last-thing-he-told-me.jpg',
        description: 'Before Owen Michaels disappears, he smuggles a note to his beloved wife of one year: Protect her. Despite her confusion and fear, Hannah Hall knows exactly to whom the note refers: Owen’s sixteen-year-old daughter, Bailey...'
    };
    isLoading = true;
    books: Book[] = [];
    readBooks: Book[] = [];

    private readonly destroy$ = new Subject<void>();
    constructor(
        private apiService: ApiService,
        private utilsService: UtilsService,
        private ngxLoader: NgxUiLoaderService
    ) { }

    async ngOnInit(): Promise<void> {
        this.ngxLoader.start();
        await this.getAllBooks();
        this.ngxLoader.stop();
    }

    async getAllBooks(): Promise<void> {
        try {
            const books = await firstValueFrom(this.apiService.fetchBooksFromGoodreads());
            this.books = books;
            if (this.books.length > 0) {
                const currentlyReadingBook = this.books.find(book => book.shelves.includes('currently-reading'));

                if (currentlyReadingBook) {
                    this.currentBook = currentlyReadingBook;
                }

                this.readBooks = this.books.filter(book => book.shelves.includes('read'));
            }
        } catch (error) {
            console.error("Failed to fetch books:", error);
            this.books = [];
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setActiveTab(tab: 'books' | 'audiobooks') {
        this.activeTab = tab;
    }

    getStarRating(rating: number): boolean[] {
        const numericRating = Math.round(Number(rating));
        return Array(5).fill(false).map((_, i) => i < numericRating);
    }
}