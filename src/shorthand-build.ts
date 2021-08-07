import type {
  SHTag, Tag,
  SHNode, Node,
  SHParsedString, ParsedString,
} from './types';

import { isSHTag } from './types';
import { _build } from './build';

function translateSHTag(tag: SHTag): Tag
{
  const [ type, ..._args ] = tag;
  const args = _args.map(translateSHParsedString);
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

function translateSHParsedString(args: SHParsedString | string): ParsedString
{
  if (typeof(args) === 'string')
    return [ args ];
  return args.map(translateSHNode);
}

/*
 * Serialize ShortHand ParsedString AST to a rich-text string
 */
export default function shorthandBuild(...args: SHParsedString): string
{
  return _build(translateSHParsedString(args));
}
