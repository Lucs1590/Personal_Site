import { Deserializable } from './deserializable.model';

export class Technology implements Deserializable {
    id?: number;
    name?: string;
    image?: string;
    description?: string;
    link?: string;

    deserialize(input: {
        id?: number;
        name?: string;
        image?: string;
        description?: string;
        link?: string;
    }): this {
        this.id = input?.id;
        this.name = input?.name;
        this.image = input?.image;
        this.description = input?.description;
        this.link = input?.link;
        return this;
    }
}


