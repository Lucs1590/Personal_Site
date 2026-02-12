import { Deserializable } from './deserializable.model';

export class Book implements Deserializable {
    author?: string;
    title?: string;
    description?: string;
    rating: number = 0;
    user_read_at?: Date;
    user_review?: string;
    link?: string;
    cover?: string;
    shelves?: string[];
    num_pages?: number;

    deserialize(input: any): this {
        Object.assign(this, {});
        this.author = input.author;
        this.title = input.title.split(':')[0].split('(')[0].trim();
        this.description = input.description;
        this.rating = input.rating ? parseInt(input.rating, 10) : 0;
        this.user_read_at = input.user_read_at ? new Date(input.user_read_at) : undefined;
        this.user_review = input.user_review;
        this.link = input.link;
        this.cover = input.cover;
        if (input.shelves) {
            if (typeof input.shelves === 'string') {
                this.shelves = input.shelves.split(',').map((shelf: string) => shelf.trim());
            } else if (Array.isArray(input.shelves)) {
                this.shelves = input.shelves.map((shelf: string) => shelf.trim());
            } else {
                this.shelves = ['read'];
            }
        } else {
            this.shelves = ['read'];
        }
        this.num_pages = input.num_pages ? parseInt(input.num_pages, 10) : undefined;
        return this;
    }
}