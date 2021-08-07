import type { RichTextAST } from '../types';
import type { HandlersMap, FormatOptions } from './ast';

import parse from '../parse';
import { formatAST } from './ast';

function identity<T>(item: T): T
{
  return item;
}

function _mergeStrings(strings: Array<string>)
{
  return strings.join('');
}

/*
 * Transform a RichTextAST to a string, using the provided options.
 * The `handlers` map specifies a transform function for each handled tag type.
 *   Unhandled tags are stripped (replaced with their last arg as fallback value if specified, removed otherwise).
 * The `formatString` optional function is used to format every string Node if specified.
 */
export function formatToString(
  ast: RichTextAST,
  opts: Partial<Pick<FormatOptions<string>, 'formatString' | 'handlers'>> = {},
): string
{
  const { formatString, handlers } = opts;
  return formatAST(ast, {
    formatString: formatString || identity,
    mergeNodeContents: _mergeStrings,
    handlers,
  });
}

/*
 * Process a rich-text string, transforming tags to strings using the provided handlers map.
 * The handlers map specifies a transform function for each handled tag type.
 * Unhandled tags are stripped (replaced with their last arg as fallback value if specified, removed otherwise).
 */
export default function format(str: string, handlers?: HandlersMap<string>): string
{
  return formatToString(parse(str), { handlers });
}

/*
 * Remove all tags from a rich-text string, replacing them with their last arg as fallback value if existing.
 */
export function strip(str: string): string
{
  return format(str);
}
