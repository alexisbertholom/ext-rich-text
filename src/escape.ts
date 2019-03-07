export default function escape(str: string): string
{
  return str.replace(/[[|\]]/g, '\\$&');
}

export function unescape(str: string): string
{
  return str.replace(/\\([[|\]])/g, '$1');
}
