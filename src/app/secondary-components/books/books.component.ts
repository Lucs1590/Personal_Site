import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Book } from 'src/app/models/book.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SeoService } from 'src/app/services/seo.service';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css'],
    standalone: false
})
export class BooksComponent implements OnInit, OnDestroy {
    activeTab: 'books' | 'audiobooks' = 'books';

    currentlyReadingBooks: Partial<Book>[] = [];
    currentCarouselIndex = 0;
    isLoading = true;
    books: Book[] = [];
    private readBooksOriginal: Book[] = [];
    filteredReadBooks: Book[] = [];
    currentSort: string = 'recent';

    private readonly destroy$ = new Subject<void>();
    constructor(
        private apiService: ApiService,
        private ngxLoader: NgxUiLoaderService,
        private seoService: SeoService
    ) { }

    async ngOnInit(): Promise<void> {
        this.updateSeoMetadata();
        this.ngxLoader.start();
        await this.getAllBooks();
        this.ngxLoader.stop();
    }

    private updateSeoMetadata(): void {
        this.seoService.updateMetadata({
            title: 'Lucas Brito - Books | Reading List & Reviews',
            description: 'Discover Lucas Brito\'s reading list including books on AI, Machine Learning, Software Development, and personal growth. See what books are being read and reviews.',
            keywords: 'Lucas Brito Books, Reading List, Book Reviews, AI Books, Machine Learning Books, Software Development Books'
        });
    }

    async getAllBooks(): Promise<void> {
        try {
            const books = await firstValueFrom(this.apiService.fetchBooksFromGoodreads());
            this.books = books;
            if (this.books.length > 0) {
                // Get all currently reading books
                const currentlyReading = this.books.filter(book => book.shelves.includes('currently-reading'));

                if (currentlyReading.length > 0) {
                    this.currentlyReadingBooks = currentlyReading;
                    // Reset carousel index if it's out of bounds
                    if (this.currentCarouselIndex >= currentlyReading.length) {
                        this.currentCarouselIndex = 0;
                    }
                } else {
                    // Default placeholder if no books are currently being read
                    this.currentlyReadingBooks = [{
                        cover: 'assets/img/cover.png',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sed nisl neque. Nulla at fermentum massa, eget egestas orci. Cras convallis enim ex, sit amet posuere diam maximus sed. Phasellus pharetra dui risus, vitae dapibus est placerat id. Nullam eget velit ex. Donec a feugiat libero. Maecenas condimentum lacus vitae arcu pulvinar, eu rhoncus dui tincidunt. Suspendisse nec libero sit amet velit finibus mollis. Pellentesque placerat porta dolor et mattis. Suspendisse quis metus at metus condimentum ultrices eget sed nunc.'
                    }];
                    this.currentCarouselIndex = 0;
                }

                this.readBooksOriginal = this.books.filter(book => book.shelves.includes('read'));
                this.filteredReadBooks = [...this.readBooksOriginal];
                this.sortFiltered(this.currentSort);
            } else {
                this.currentlyReadingBooks = [];
                this.currentCarouselIndex = 0;
                this.readBooksOriginal = [];
                this.filteredReadBooks = [];
            }
        } catch (error) {
            console.error("Failed to fetch books:", error);
            this.books = [];
            this.currentlyReadingBooks = [];
            this.currentCarouselIndex = 0;
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

    applyFilters(query: string = '', onlyThisYear: boolean = false, sortOrder: string = 'recent'): void {
        const searchQuery = (query || '').trim().toLowerCase();
        const yearNow = new Date().getFullYear();
        this.currentSort = sortOrder || this.currentSort;

        this.filteredReadBooks = this.readBooksOriginal.filter(book => {
            if (onlyThisYear) {
                const readDate = book.user_read_at ? new Date(book.user_read_at) : null;
                if (!readDate || readDate.getFullYear() !== yearNow) {
                    return false;
                }
            }

            if (!searchQuery) return true;

            const title = (book.title ?? '').toLowerCase();
            const author = (book.author ?? '').toLowerCase();
            const description = (book.description ?? '').toLowerCase();

            return title.includes(searchQuery) || author.includes(searchQuery) || description.includes(searchQuery);
        });

        this.sortFiltered(this.currentSort);
    }


    private sortFiltered(sortOrder: string): void {
        const copy = [...this.filteredReadBooks];
        switch (sortOrder) {
            case 'oldest':
                copy.sort((a, b) => {
                    const da = a.user_read_at ? new Date(a.user_read_at).getTime() : 0;
                    const db = b.user_read_at ? new Date(b.user_read_at).getTime() : 0;
                    return da - db;
                });
                break;
            case 'title_asc':
                copy.sort((a, b) => (a.title ?? '').localeCompare(b.title ?? ''));
                break;
            case 'title_desc':
                copy.sort((a, b) => (b.title ?? '').localeCompare(a.title ?? ''));
                break;
            case 'rating_desc':
                copy.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
                break;
            case 'rating_asc':
                copy.sort((a, b) => (Number(a.rating) || 0) - (Number(b.rating) || 0));
                break;
            case 'recent':
            default:
                copy.sort((a, b) => {
                    const da = a.user_read_at ? new Date(a.user_read_at).getTime() : 0;
                    const db = b.user_read_at ? new Date(b.user_read_at).getTime() : 0;
                    return db - da;
                });
                break;
        }
        this.filteredReadBooks = copy;
    }

    nextBook(): void {
        if (this.currentlyReadingBooks.length > 1) {
            this.currentCarouselIndex = (this.currentCarouselIndex + 1) % this.currentlyReadingBooks.length;
        }
    }

    previousBook(): void {
        if (this.currentlyReadingBooks.length > 1) {
            this.currentCarouselIndex = (this.currentCarouselIndex - 1 + this.currentlyReadingBooks.length) % this.currentlyReadingBooks.length;
        }
    }

    goToBook(index: number): void {
        if (index >= 0 && index < this.currentlyReadingBooks.length) {
            this.currentCarouselIndex = index;
        }
    }

    get currentBook(): Partial<Book> {
        return this.currentlyReadingBooks[this.currentCarouselIndex] || {};
    }

    // Touch/swipe support for mobile
    private touchStartX = 0;
    private touchEndX = 0;

    onTouchStart(event: TouchEvent): void {
        this.touchStartX = event.changedTouches[0].clientX;
    }

    onTouchEnd(event: TouchEvent): void {
        this.touchEndX = event.changedTouches[0].clientX;
        this.handleSwipe(event);
    }

    private handleSwipe(event: TouchEvent): void {
        const swipeThreshold = 50; // minimum distance for swipe
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            // Prevent default behavior for valid swipes
            event.preventDefault();
            
            if (diff > 0) {
                // Swipe left - go to next book
                this.nextBook();
            } else {
                // Swipe right - go to previous book
                this.previousBook();
            }
        }
    }
}
