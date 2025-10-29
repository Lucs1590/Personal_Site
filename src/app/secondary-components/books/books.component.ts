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

    currentBook = {
        title: 'The Last Thing He Told Me',
        author: 'Laura Dave',
        cover: 'assets/the-last-thing-he-told-me.jpg'
    };

    authorOfWeek = {
        name: 'Stephen King',
        collectionCount: 78,
        image: 'assets/stephen-king.jpg'
    };

    readBooks = [
        {
            title: 'Left to Fear',
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
}
