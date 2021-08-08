import type { Tag, Node, RichTextAST, ReadonlyRichTextAST } from '../types';

import { isTag } from '../types';

export type TagHandler<NodeContentT> = (args: ReadonlyArray<ReadonlyRichTextAST>, opts: FormatOptions<NodeContentT>) => NodeContentT;
export type HandlersMap<NodeContentT> = Readonly<Record<string, TagHandler<NodeContentT>>>;

export interface FormatOptions<NodeContentT>
{
  readonly formatString: (s: string) => NodeContentT,
  readonly mergeNodeContents: (contents: ReadonlyArray<Readonly<NodeContentT>>) => NodeContentT,
  readonly handlers?: HandlersMap<NodeContentT>,
}

function formatTag<NodeContentT>(tag: Tag, opts: FormatOptions<NodeContentT>): NodeContentT | null
{
  const { handlers } = opts;

  const { type, args } = tag;
  if (handlers)
  {
    const handler = handlers[type];
    if (handler)
      return handler(args, opts);
  }
  if (args.length > 0)
  {
    const lastArg = args[args.length - 1];
    return formatAST(lastArg, opts);
  }
  return null;
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
 * Transform a RichTextAST into a custom NodeContentT format, which can be anything, using the provided options.
 * The `handlers` map specifies a transform function for each handled tag type.
 *   Unhandled tags are stripped (replaced with their last arg as fallback value if specified, removed otherwise).
 * The `formatString` function is used to format every string Node.
 * The `mergeNodeContents` function merges multiple items (NodeContentT) into one.
 */
export function formatAST<NodeContentT>(ast: RichTextAST, opts: FormatOptions<NodeContentT>): NodeContentT
{
  const { mergeNodeContents } = opts;

  const contents = new Array<NodeContentT>();
  for (const node of ast)
  {
    const content = formatNode(node, opts);
    if (content)
      contents.push(content);
  }
  return mergeNodeContents(contents);
}
