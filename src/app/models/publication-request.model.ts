export interface PublicationRequest {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: Array<{
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
  }>;
}
