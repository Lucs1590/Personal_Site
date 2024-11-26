export class Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  images: string[];
  videos: string[];

  constructor(
    id: string,
    name: string,
    description: string,
    technologies: string[],
    images: string[],
    videos: string[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.technologies = technologies;
    this.images = images;
    this.videos = videos;
  }
}
