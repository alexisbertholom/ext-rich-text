import type { ReadonlyTag, ReadonlyNode, ReadonlyRichTextAST } from './types';

import { isTag } from './types';
import escape from './escape';

function formatTag(tag: ReadonlyTag): string
{
  const { type, args } = tag;
  const parsedArgs = args.map(arg => _build(arg));
  const contents = [ escape(type) ].concat(parsedArgs).join('|');
  return `[${contents}]`;
}

function formatNode(node: ReadonlyNode): string
{
  return isTag(node) ? (
    formatTag(node)
  ) : (
    escape(node)
  );
}

export function _build(args: ReadonlyRichTextAST): string
{
  return args.reduce<string>((result: string, node: ReadonlyNode) => (
    result + formatNode(node)
  ), '');
}

/*
 * Serialize rich-text AST to a rich-text string
 */
export default function build(...args: ReadonlyRichTextAST): string
{
  return _build(args);
}
