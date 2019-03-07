export default function escape(str: string): string
{
  return str.replace('[', '\\[').replace(']', '\\]').replace('|', '\\|');
}

export function unescape(str: string): string
{
  return str.replace('\\[', '[').replace('\\]', ']').replace('\\|', '|');
}
