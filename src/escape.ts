/*
 * Escape a string to make it rich-text safe.
 * Add a '\' before every rich-text special character: '[', '|', ']'
 */
const EscapeRegExp = new RegExp('[[|\\]]', 'g');
export default function escape(str: string): string
{
  return str.replace(EscapeRegExp, '\\$&');
}

/*
 * Unescape an escaped rich-text string.
 * Remove any '\' preceding a rich-text special character: '[', '|', ']'
 */
const UnescapeRegExp = new RegExp('\\\\([[|\\]])', 'g');
export function unescape(str: string): string
{
  return str.replace(UnescapeRegExp, '$1');
}
