import type { Tag, Node, ParsedString } from '../types';

import { isTag } from '../types';

export type TagHandler<NodeContentT> = (content: NodeContentT | null, ...args: NodeContentT[]) => NodeContentT;
export type HandlersMap<NodeContentT> = Map<string, TagHandler<NodeContentT>>;

export interface FormatOptions<NodeContentT>
{
  formatString: (s: string) => NodeContentT,
  mergeNodeContents: (contents: Array<NodeContentT>) => NodeContentT,
  handlers?: HandlersMap<NodeContentT>,
}

function formatTag<NodeContentT>(tag: Tag, opts: FormatOptions<NodeContentT>): NodeContentT | null
{
  const { handlers } = opts;

  const { type, args, node } = tag;
  const content = (node === null) ? null : formatParsedString(node, opts);
  if (handlers)
  {
    const handler = handlers.get(type);
    if (handler)
    {
      const parsedArgs = args.map(arg => formatParsedString(arg, opts));
      return handler(content, ...parsedArgs);
    }
  }
  return content;
}

function formatNode<NodeContentT>(node: Node, opts: FormatOptions<NodeContentT>): NodeContentT | null
{
  const { formatString } = opts;

  return isTag(node) ? (
    formatTag<NodeContentT>(node, opts)
  ) : (
    formatString(node)
  );
}

/*
 * Transform a ParsedString AST into a custom NodeContentT format, which can be anything, using the provided options.
 * The `handlers` map specifies a transform function for each handled tag type.
 *   Unhandled tags are stripped (replaced with their `node` value if existing, removed otherwise).
 * The `formatString` function is used to format every string Node.
 * The `mergeNodeContents` function merges multiple items (NodeContentT) into one.
 */
export function formatParsedString<NodeContentT>(parsedString: ParsedString, opts: FormatOptions<NodeContentT>): NodeContentT
{
  const { mergeNodeContents } = opts;

  const contents = new Array<NodeContentT>();
  for (const node of parsedString)
  {
    const content = formatNode(node, opts);
    if (content)
      contents.push(content);
  }
  return mergeNodeContents(contents);
}
