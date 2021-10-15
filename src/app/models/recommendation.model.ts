import { Deserializable } from './deserializable.model';

export class Recommendation implements Deserializable {
  author?: string;
  authorImage?: string;
  text?: string;
  stage?: string;

  deserialize(input: {
    author: string;
    authorImage: string;
    text: string;
    stage: string;
  }): this {
    Object.assign(this, input);
    return this;
  }
}
