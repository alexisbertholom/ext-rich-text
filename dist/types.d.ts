export interface Tag {
    type: string;
    args: Array<ParsedString>;
    node: ParsedString | null;
}
export declare type Node = string | Tag;
export declare type ParsedString = Array<Node>;
export declare function isTag(node: Node): node is Tag;
export declare type SHTag = [string, ...(SHParsedString | string)[]];
export declare type SHNode = string | SHTag;
export declare type SHParsedString = Array<SHNode>;
export declare function isSHTag(node: SHNode): node is SHTag;
