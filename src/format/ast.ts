import { Tag, Node, ParsedString, isTag } from '../types';

export type HandlersMap<NodeContentT> = Map<string, (content: NodeContentT | null, ...args: NodeContentT[]) => NodeContentT>;

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
