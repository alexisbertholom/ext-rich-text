const EscapeRegExp = new RegExp('[[|\\]]', 'g');
export default function escape(str: string): string
{
  return str.replace(EscapeRegExp, '\\$&');
}

const UnescapeRegExp = new RegExp('\\\\([[|\\]])', 'g');
export function unescape(str: string): string
{
  return str.replace(UnescapeRegExp, '$1');
}
