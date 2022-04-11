import { Deserializable } from './deserializable.model';

export class IPInfo implements Deserializable {
  

  deserialize(input: any): this {
    Object.assign(this, {});
    return this;
  }
}
