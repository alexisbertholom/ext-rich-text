import { ParsedString } from '../types';
import parse from '../parse';
import { HandlersMap, FormatOptions, formatParsedString } from './ast';

function identity<T>(item: T): T
{
  return item;
}

function _mergeStrings(strings: Array<string>)
{
  return strings.join('');
}

export function formatToString(
  parsedString: ParsedString,
  opts: Partial<Pick<FormatOptions<string>, 'formatString' | 'handlers'>>,
): string
{
  const { formatString, handlers } = opts;
  return formatParsedString(parsedString, {
    formatString: formatString || identity,
    mergeNodeContents: _mergeStrings,
    handlers,
  });
}

export default function format(str: string, handlers?: HandlersMap<string>): string
{
  return formatToString(parse(str), { handlers });
}

export function strip(str: string)
{
  return format(str);
}
