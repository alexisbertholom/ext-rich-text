import parse from './parse';
import { Tag, Node, ParsedString, isTag } from './types';

export type HandlersMap = Map<string, (content: string | null, ...args: string[]) => string>;

function formatTag(tag: Tag, handlers?: HandlersMap): string | null
{
  const { type, args, node } = tag;
  const content = node && formatParsedString(node, handlers);
  if (handlers)
  {
    const handler = handlers.get(type);
    if (handler)
    {
      const parsedArgs = args.map(arg => formatParsedString(arg, handlers));
      return handler(content, ...parsedArgs);
    }
  }
  return content;
}

function formatNode(node: Node, handlers?: HandlersMap): string | null
{
  return isTag(node) ? (
    formatTag(node, handlers)
  ) : (
    node
  );
}

function formatParsedString(parsedString: ParsedString, handlers?: HandlersMap): string
{
  return parsedString.reduce<string>((result: string, node: Node) => {
    const nodeContent = formatNode(node, handlers);
    if (nodeContent === null)
      return result;
    return result + nodeContent;
  }, '');
}

export default function format(str: string, handlers?: HandlersMap): string
{
  return formatParsedString(parse(str), handlers);
}

export function strip(str: string)
{
  return format(str);
}
