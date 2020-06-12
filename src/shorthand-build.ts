import {
  SHTag, Tag,
  SHNode, Node,
  SHParsedString, ParsedString,
  isSHTag,
} from './types';
import { _build } from './build';

function translateSHTag(tag: SHTag): Tag
{
  const [ type, ..._args ] = tag;
  const args = _args.map(translateSHParsedString);
  return {
    type,
    args,
    node: args.pop() || null,
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

export default function shorthandBuild(...args: SHParsedString): string
{
  return _build(translateSHParsedString(args));
}
