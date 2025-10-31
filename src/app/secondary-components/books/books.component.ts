import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Book } from 'src/app/models/book.model';

interface Author {
    name: string;
    collectionCount: number;
    image: string;
}

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
        cover: 'assets/the-last-thing-he-told-me.jpg'
    };

    authorOfWeek: Author = {
        name: 'Stephen King Collection',
        collectionCount: 78,
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg'
    };

    books: Book[] = [];
    readBooks: Book[] = [];


    private readonly destroy$ = new Subject<void>();
    constructor(
        private apiService: ApiService,
        private utilsService: UtilsService,
    ) { }

    async ngOnInit(): Promise<void> {
        await this.getAllBooks();
    }

    async getAllBooks(): Promise<void> {
        try {
            const books = await firstValueFrom(this.apiService.fetchBooksFromGoodreads());
            this.books = books;
            if (this.books.length > 0) {
                this.currentBook = this.books.filter(book => book.shelves.includes('currently-reading'))[0];
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