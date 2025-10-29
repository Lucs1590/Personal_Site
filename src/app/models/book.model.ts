import { Deserializable } from './deserializable.model';

export class Book implements Deserializable {
    author?: string;
    title?: string;
    rating: number = 0;
    user_read_at?: Date;
    user_review?: string;
    link?: string;
    cover?: string;

    deserialize(input: any): this {
        Object.assign(this, {});
        this.author = input.author;
        this.title = input.title.split(':')[0];
        this.rating = input.rating ? parseInt(input.rating, 10) : 0;
        this.user_read_at = input.user_read_at ? new Date(input.user_read_at) : undefined;
        this.user_review = input.user_review;
        this.link = input.link;
        this.cover = input.cover;
        return this;
    }
}