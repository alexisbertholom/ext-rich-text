import type { ParsedString } from '../types';
import type { HandlersMap, FormatOptions } from './ast';

import parse from '../parse';
import { formatParsedString } from './ast';

function identity<T>(item: T): T
{
  return item;
}

function _mergeStrings(strings: Array<string>)
{
  return strings.join('');
}

/*
 * Transform a ParsedString AST to a string, using the provided options.
 * The `handlers` map specifies a transform function for each handled tag type.
 *   Unhandled tags are stripped (replaced with their `node` value if existing, removed otherwise).
 * The `formatString` optional function is used to format every string Node if specified.
 */
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

/*
 * Process a rich-text string, transforming tags to strings using the provided handlers map.
 * The handlers map specifies a transform function for each handled tag type.
 * Unhandled tags are stripped (replaced with their `node` value if existing).
 */
export default function format(str: string, handlers?: HandlersMap<string>): string
{
  return formatToString(parse(str), { handlers });
}

/*
 * Remove all tags from a rich-text string, replacing them with their `node` value if existing
 */
export function strip(str: string)
{
  return format(str);
}
