import type { ParsedString } from '../types';
export declare type HandlersMap<NodeContentT> = Map<string, (content: NodeContentT | null, ...args: NodeContentT[]) => NodeContentT>;
export interface FormatOptions<NodeContentT> {
    formatString: (s: string) => NodeContentT;
    mergeNodeContents: (contents: Array<NodeContentT>) => NodeContentT;
    handlers?: HandlersMap<NodeContentT>;
}
export declare function formatParsedString<NodeContentT>(parsedString: ParsedString, opts: FormatOptions<NodeContentT>): NodeContentT;
