import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
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
        cover: 'assets/img/cover.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed nisl neque. Nulla at fermentum massa, eget egestas orci. Cras convallis enim ex, sit amet posuere diam maximus sed. Phasellus pharetra dui risus, vitae dapibus est placerat id. Nullam eget velit ex. Donec a feugiat libero. Maecenas condimentum lacus vitae arcu pulvinar, eu rhoncus dui tincidunt. Suspendisse nec libero sit amet velit finibus mollis. Pellentesque placerat porta dolor et mattis. Suspendisse quis metus at metus condimentum ultrices eget sed nunc.'
    };
    isLoading = true;
    books: Book[] = [];
    private readBooksOriginal: Book[] = [];
    filteredReadBooks: Book[] = [];

    private readonly destroy$ = new Subject<void>();
    constructor(
        private apiService: ApiService,
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

                this.readBooksOriginal = this.books.filter(book => book.shelves.includes('read'));
                this.filteredReadBooks = [...this.readBooksOriginal];
            } else {
                this.readBooksOriginal = [];
                this.filteredReadBooks = [];
            }
        } catch (error) {
            console.error("Failed to fetch books:", error);
            this.books = [];
            this.readBooksOriginal = [];
            this.filteredReadBooks = [];
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

    applyFilters(query: string = '', onlyThisYear: boolean = false): void {
        const q = query.trim().toLowerCase();
        const yearNow = new Date().getFullYear();

        this.filteredReadBooks = this.readBooksOriginal.filter(book => {
            if (onlyThisYear) {
                const readDate = book.user_read_at ? new Date(book.user_read_at) : null;
                if (!readDate || readDate.getFullYear() !== yearNow) {
                    return false;
                }
            }

            if (!q) return true;

            const title = (book.title ?? '').toLowerCase();
            const author = (book.author ?? '').toLowerCase();
            const description = (book.description ?? '').toLowerCase();

            return title.includes(q) || author.includes(q) || description.includes(q);
        });
    }
}
