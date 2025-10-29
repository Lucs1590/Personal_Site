import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-books',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent {

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

    setActiveTab(tab: 'books' | 'audiobooks') {
        this.activeTab = tab;
    }

    getStarRating(rating: number): boolean[] {
        return Array(5).fill(false).map((_, i) => i < rating);
    }
}