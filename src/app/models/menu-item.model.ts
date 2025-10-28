export interface MenuItem {
    name?: Promise<string> | string;
    ref?: string[];
    mobile?: boolean;
    desktop?: boolean;
}