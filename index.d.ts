export interface Style {
    NPM: 'NPM';
    FMW: 'FMW';
}

export declare const STYLE: Style;

export interface DrawOptions {
    style?: keyof Style;
    label?: string | ((node: any) => string | Promise<string>);
    nodes?: string | ((node: any) => any[] | Promise<any[]>);
    drawRootBranch?: boolean;
    prefix?: string;
    unicode?: boolean;
    concurrency?: number;
}

export function draw(node: any, options: DrawOptions): string;
export function drawAsync(node: any, options: DrawOptions): Promise<string>;
