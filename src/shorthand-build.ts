import type {
  ReadonlySHTag, ReadonlyTag,
  ReadonlySHNode, ReadonlyNode,
  ReadonlySHRichTextAST, ReadonlyRichTextAST,
} from './types';

import { isSHTag } from './types';
import { _build } from './build';

function translateSHTag(tag: ReadonlySHTag): ReadonlyTag
{
  const [ type, ..._args ] = tag;
  const args = _args.map(translateSHRichTextAST);
  return {
    type,
    args,
  };
}

function translateSHNode(node: ReadonlySHNode): ReadonlyNode
{
  return isSHTag(node) ? (
    translateSHTag(node)
  ) : node;
}

function translateSHRichTextAST(args: ReadonlySHRichTextAST | string): ReadonlyRichTextAST
{
  if (typeof(args) === 'string')
    return [ args ];
  return args.map(translateSHNode);
}

/*
 * Serialize ShortHand RichTextAST to a rich-text string
 */
export default function shorthandBuild(...args: ReadonlySHRichTextAST): string
{
  return _build(translateSHRichTextAST(args));
}
