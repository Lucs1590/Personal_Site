import { Deserializable } from './deserializable.model';

export class Publication implements Deserializable {
  title?: string;
  description?: string;
  image?: string;
  publicationDate?: Date;
  url?: string;
  author?: string;
  categories?: string[];
  venue?: string;
  year?: number;
  doi?: string;
  pdfUrl?: string;
  githubUrl?: string;
  type?: string;

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
    venue?: string;
    year?: number;
    doi?: string;
    pdfUrl?: string;
    githubUrl?: string;
    type?: string;
  }): this {
    Object.assign(this, {});
    this.title = input?.title;

    const parser = new DOMParser();
    const parsedDescription = parser.parseFromString(input?.description, 'text/html');
    const sanitizedDescription = parsedDescription.body.textContent || '';

    this.description = sanitizedDescription.slice(0, 210) + '..</p>';

    if (input?.thumbnail) {
      this.image = input.thumbnail;
    } else if (input?.content) {
      const contentDoc = new DOMParser().parseFromString(input?.content, 'text/html');
      const img = contentDoc.querySelector('img');
      this.image = img?.getAttribute('src') || undefined;
    }
    this.publicationDate = new Date(input?.pubDate);
    this.url = input?.link;
    this.author = input?.author;
    this.categories = input?.categories;
    this.venue = input?.venue;
    this.year = input?.year || new Date(input?.pubDate).getFullYear();
    this.doi = input?.doi;
    this.pdfUrl = input?.pdfUrl;
    this.githubUrl = input?.githubUrl;
    this.type = input?.type || 'blog';
    return this;
  }
}

