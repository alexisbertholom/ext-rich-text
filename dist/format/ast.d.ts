import type { ReadonlyRichTextAST } from '../types';
export declare type TagHandler<NodeContentT> = (args: ReadonlyArray<ReadonlyRichTextAST>, opts: FormatOptions<NodeContentT>) => NodeContentT;
export declare type HandlersMap<NodeContentT> = Readonly<Record<string, TagHandler<NodeContentT>>>;
export interface FormatOptions<NodeContentT> {
    readonly formatString: (s: string) => NodeContentT;
    readonly mergeNodeContents: (contents: ReadonlyArray<Readonly<NodeContentT>>) => NodeContentT;
    readonly handlers?: HandlersMap<NodeContentT>;
}
export declare function formatAST<NodeContentT>(ast: ReadonlyRichTextAST, opts: FormatOptions<NodeContentT>): NodeContentT;
