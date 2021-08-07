import type {
  SHTag, Tag,
  SHNode, Node,
  SHRichTextAST, RichTextAST,
} from './types';

import { isSHTag } from './types';
import { _build } from './build';

function translateSHTag(tag: SHTag): Tag
{
  const [ type, ..._args ] = tag;
  const args = _args.map(translateSHRichTextAST);
  return {
    type,
    args,
  };
}

function translateSHNode(node: SHNode): Node
{
  return isSHTag(node) ? (
    translateSHTag(node)
  ) : node;
}

function translateSHRichTextAST(args: SHRichTextAST | string): RichTextAST
{
  if (typeof(args) === 'string')
    return [ args ];
  return args.map(translateSHNode);
}

/*
 * Serialize ShortHand RichTextAST to a rich-text string
 */
export default function shorthandBuild(...args: SHRichTextAST): string
{
  return _build(translateSHRichTextAST(args));
}
