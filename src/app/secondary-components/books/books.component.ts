import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css'],
    standalone: false
})
export class BooksComponent implements OnInit, OnDestroy {
    activeTab: 'books' | 'audiobooks' = 'books';
    currentBook = {
        title: 'The Last Thing He Told Me',
        author: 'Laura Dave',
        cover: 'assets/the-last-thing-he-told-me.jpg'
    };
    authorOfWeek = {
        name: 'Stephen King Collection',
        collectionCount: 78,
        image: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg'
    };
    readBooks = [
        {
            title: 'False Witness: A Novel',
            author: 'Karin Slaughter',
            cover: 'assets/left-to-fear.jpg',
            rating: 4
        },
        {
            title: 'Malibu Rising',
            author: 'Taylor Jenkins Reid',
            cover: 'assets/malibu-rising.jpeg',
            rating: 5
        },
        {
            title: 'Black Ice',
            author: 'Brad Thor',
            cover: 'assets/black-ice.jpg',
            rating: 4
        }
    ];

    private readonly destroy$ = new Subject<void>();
    constructor(
        private apiService: ApiService,
        private utilsService: UtilsService,
    ) { }

    async ngOnInit(): Promise<void> {
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    setActiveTab(tab: 'books' | 'audiobooks') {
        this.activeTab = tab;
    }

    getStarRating(rating: number): boolean[] {
        return Array(5).fill(false).map((_, i) => i < rating);
    }
}