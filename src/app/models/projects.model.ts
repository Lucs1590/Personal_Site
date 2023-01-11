import { Deserializable } from './deserializable.model';

export class Project implements Deserializable {
    id?: number;
    name?: string;
    description?: string;
    tags?: string[];
    link?: string;
    type?: string;
    company?: string;
    technologies?: string[];
    image?: string;

    deserialize(input: {
        id?: number;
        name?: string;
        description?: string;
        tags?: string[];
        link?: string;
        type?: string;
        company?: string;
        technologies?: string[];
        image?: string;
    }): this {
        Object.assign(this, {});
        this.id = input?.id;
        this.name = input?.name;
        this.description = input?.description;
        this.tags = input?.tags;
        this.link = input?.link;
        this.type = input?.type;
        this.company = input?.company;
        this.technologies = input?.technologies;
        this.image = input?.image;
        return this;
    }
}
