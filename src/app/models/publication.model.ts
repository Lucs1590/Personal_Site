import { Deserializable } from './deserializable.model';

export class Publication implements Deserializable {
  title?: string;
  description?: string;
  image?: string;
  publicationDate?: Date;
  url?: string;
  author?: string;

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
    this.description = input?.description
      .slice(input?.description.indexOf('<p>'), input?.description.indexOf('</p>'))
      .replace(new RegExp('<.+?>', 'g'), '')
      .concat('..</p>'); // 210 chars or until the end.
    this.image = input?.thumbnail;
    this.publicationDate = new Date(input?.pubDate);
    this.url = input?.link;
    this.author = input?.author;
    return this;
  }
}