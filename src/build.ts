import { Tag, Node, ParsedString, isTag } from './types';
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

function _build(args: ParsedString)
{
  return args.reduce<string>((result: string, node: Node) => (
    result + formatNode(node)
  ), '');
}

export default function build(...args: ParsedString): string
{
  return _build(args);
}

type SHTag = [ string, ...(SHParsedString | string)[] ];
type SHNode = string | SHTag;

//interface used instance of type to prevent typescript's type aliases circular references
interface SHParsedString extends Array<SHNode> {};

function isSHTag(node: SHNode): node is SHTag
{
  return Array.isArray(node);
}

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

export function shorthandBuild(...args: SHParsedString): string
{
  return _build(translateSHParsedString(args));
}
