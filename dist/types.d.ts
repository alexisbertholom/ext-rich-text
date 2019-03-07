export interface Tag {
    type: string;
    args: Array<ParsedString>;
    node: ParsedString | null;
}
export declare type Node = string | Tag;
export declare type ParsedString = Array<Node>;
export declare function isTag(node: Node): node is Tag;
