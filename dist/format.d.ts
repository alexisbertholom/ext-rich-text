export declare type HandlersMap = Map<string, (textValue: string | null, ...args: string[]) => string>;
export default function format(str: string, handlers?: HandlersMap): string;
export declare function strip(str: string): string;
