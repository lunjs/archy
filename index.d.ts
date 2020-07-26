export interface STYLE {
    NPM: 'NPM';
    FMW: 'FMW';
}

export interface DrawOptions {
    style?: keyof STYLE;
    label?: string | ((node: any) => string | Promise<string>);
    nodes?: string | ((node: any) => any[] | Promise<any[]>);
    drawRootBranch?: boolean;
    prefix?: string;
    unicode?: boolean;
}

export function draw(node: any, options: DrawOptions): string;
export function drawAsync(node: any, options: DrawOptions): Promise<string>;
