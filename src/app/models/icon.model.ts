import { Deserializable } from './deserializable.model';

export class Icon implements Deserializable {
    icon: string[] = [];
    link: string = '';
    active: boolean = false;
    description: string = '';

    deserialize(input: {
        icon?: string[];
        link?: string;
        active?: boolean;
        description?: string;
    }): this {
        this.icon = input?.icon || [];
        this.link = input?.link || '';
        this.active = input?.active || false;
        this.description = input?.description || '';
        return this;
    }
}
