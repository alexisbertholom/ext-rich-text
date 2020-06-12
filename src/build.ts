import type { Tag, Node, ParsedString } from './types';

import { isTag } from './types';
import escape from './escape';

function formatTag(tag: Tag): string
{
  const { type, args, node } = tag;
  const _args = node ? args.concat([ node ]) : args;
  const parsedArgs = _args.map(arg => _build(arg));
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

export function _build(args: ParsedString)
{
  return args.reduce<string>((result: string, node: Node) => (
    result + formatNode(node)
  ), '');
}

/*
 * Serialize ParsedString AST to a rich-text string
 */
export default function build(...args: ParsedString): string
{
  return _build(args);
}
