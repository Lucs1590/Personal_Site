import { Deserializable } from './deserializable.model';

export class Repository implements Deserializable {
    public name: string;
    public stars: number;
    public forks: number;
    public issues: number;
    public url: string;
    public topics: string[];
    public language: string;
    public description: string;
    public created_at: Date;
    public updateDate: Date;
    public private: boolean;

    deserialize(input: any): this {
        this.name = input?.name;
        this.stars = input?.stargazers_count;
        this.forks = input?.forks_count;
        this.issues = input?.open_issues_count;
        this.url = input?.html_url;
        this.topics = input?.topics;
        this.language = input?.language;
        this.description = input?.description;
        this.created_at = new Date(input?.created_at);
        this.updateDate = new Date(input?.updated_at);
        this.private = input?.private;

        return this;
    }
}