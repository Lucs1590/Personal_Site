import { Deserializable } from './deserializable.model';

export class Publication implements Deserializable {
  title?: string;
  description?: string;
  image?: string;
  publicationDate?: Date;
  url?: string;
  author?: string;
  categories?: string[];

  deserialize(input: {
    title: string;
    pubDate: string | Date;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: any;
    categories: string[];
  }): this {
    Object.assign(this, {});
    this.title = input?.title;

    const parser = new DOMParser();
    const parsedDescription = parser.parseFromString(input?.description, 'text/html');
    const sanitizedDescription = parsedDescription.body.textContent || '';

    this.description = sanitizedDescription.slice(0, 210) + '..</p>';

    this.image = input?.thumbnail;
    this.publicationDate = new Date(input?.pubDate);
    this.url = input?.link;
    this.author = input?.author;
    this.categories = input?.categories;
    return this;
  }
}

