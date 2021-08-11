export interface Tag {
    type: string;
    args: Array<RichTextAST>;
}
export declare type Node = string | Tag;
export declare type RichTextAST = Array<Node>;
export interface ReadonlyTag {
    readonly type: string;
    readonly args: ReadonlyArray<ReadonlyRichTextAST>;
}
export declare type ReadonlyNode = string | ReadonlyTag;
export declare type ReadonlyRichTextAST = ReadonlyArray<ReadonlyNode>;
export declare function isTag(node: Node): node is Tag;
export declare function isTag(node: ReadonlyNode): node is ReadonlyTag;
export declare type SHTag = [string, ...(SHRichTextAST | string)[]];
export declare type SHNode = string | SHTag;
export declare type SHRichTextAST = Array<SHNode>;
export declare type ReadonlySHTag = Readonly<[string, ...(ReadonlySHRichTextAST | string)[]]>;
export declare type ReadonlySHNode = string | ReadonlySHTag;
export declare type ReadonlySHRichTextAST = ReadonlyArray<ReadonlySHNode>;
export declare function isSHTag(node: SHNode): node is SHTag;
export declare function isSHTag(node: ReadonlySHNode): node is ReadonlySHTag;
