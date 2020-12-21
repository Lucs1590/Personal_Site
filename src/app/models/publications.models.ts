import { Deserializable } from './deserializable.model';

export class Publications implements Deserializable {
    title: string;
    description: string;
    image: string;

    deserialize(input: any): this {
        return Object.assign(this, input);
    }
}