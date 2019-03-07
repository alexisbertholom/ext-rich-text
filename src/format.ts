import parse from './parse';
import { Tag, Node, ParsedString, isTag } from './types';

export type HandlersMap = Map<string, (textValue: string | null, ...args: string[]) => string>;

function formatTag(tag: Tag, handlers?: HandlersMap): string
{
  const { type, args, node } = tag;
  const textValue = node && formatParsedString(node, handlers);
  if (handlers)
  {
    const handler = handlers.get(type);
    if (handler)
    {
      const parsedArgs = args.map(arg => formatParsedString(arg, handlers));
      return handler(textValue, ...parsedArgs);
    }
  }
  return textValue || '';
}

function formatNode(node: Node, handlers?: HandlersMap): string
{
  return isTag(node) ? (
    formatTag(node, handlers)
  ) : (
    node
  );
}

function formatParsedString(parsedString: ParsedString, handlers?: HandlersMap): string
{
  return parsedString.reduce<string>((result: string, node: Node) => (
    result + formatNode(node, handlers)
  ), '');
}

export default function format(str: string, handlers?: HandlersMap): string
{
  return formatParsedString(parse(str), handlers);
}

export function strip(str: string)
{
  return format(str);
}
