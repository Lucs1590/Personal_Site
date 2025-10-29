import { Component } from '@angular/core';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.css']
})
export class BooksComponent {
    currentBook = {
        title: 'The Last Thing He Told Me',
        author: 'Laura Dave',
        cover: 'assets/images/the-last-thing-he-told-me.jpg'
    };

    authorOfWeek = {
        name: 'Stephen King',
        collectionCount: 78,
        image: 'assets/images/stephen-king.jpg'
    };

    readBooks = [
        {
            title: 'Left to Fear',
            author: 'Karin Slaughter',
            cover: 'assets/images/left-to-fear.jpg',
            rating: 4
        },
        {
            title: 'Malibu Rising',
            author: 'Taylor Jenkins Reid',
            cover: 'assets/images/malibu-rising.jpeg',
            rating: 5
        },
        {
            title: 'Black Ice',
            author: 'Brad Thor',
            cover: 'assets/images/black-ice.jpg',
            rating: 4
        }
    ];
}
