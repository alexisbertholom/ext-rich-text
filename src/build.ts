import type { Tag, Node, RichTextAST } from './types';

import { isTag } from './types';
import escape from './escape';

function formatTag(tag: Tag): string
{
  const { type, args } = tag;
  const parsedArgs = args.map(arg => _build(arg));
  const contents = [ escape(type) ].concat(parsedArgs).join('|');
  return `[${contents}]`;
}

function formatNode(node: Node): string
{
  return isTag(node) ? (
    formatTag(node)
  ) : (
    escape(node)
  );
}

export function _build(args: RichTextAST)
{
  return args.reduce<string>((result: string, node: Node) => (
    result + formatNode(node)
  ), '');
}

/*
 * Serialize rich-text AST to a rich-text string
 */
export default function build(...args: RichTextAST): string
{
  return _build(args);
}
