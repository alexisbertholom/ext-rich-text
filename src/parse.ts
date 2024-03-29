import type { Tag, RichTextAST } from './types';

import { findFirstUnescapedCharacter } from './utils';

//Returns { tag: null } if no tag end is found
function parseTag(str: string, tagStart: number): { tagEnd: number, tag: Tag | null }
{
  const titleStart = tagStart + 1;
  const titleEnd = findFirstUnescapedCharacter(str, '|]', titleStart);
  if (titleEnd === -1)
    return { tagEnd: tagStart, tag: null };
  const type = unescape(str.substring(titleStart, titleEnd));
  const args: Array<RichTextAST> = [];
  if (str[titleEnd] === ']')
    return {
      tagEnd: titleEnd + 1,
      tag: { type, args },
    };
  let pos = titleEnd + 1;
  while (true)
  {
    const { result, end } = parseString(str, pos, true);
    if (end >= str.length)
      return { tagEnd: tagStart, tag: null };
    args.push(result);
    pos = end + 1;
    if (str[end] === ']')
      break;
  }
  return {
    tagEnd: pos,
    tag: {
      type,
      args,
    },
  };
}

function parseString(str: string, fromIndex: number = 0, insideTag: boolean): { result: RichTextAST, end: number }
{
  const searchedCharacters = insideTag ? '[]|' : '[';
  const result: RichTextAST = [];
  let pos = fromIndex;
  let tagStart: number;
  let end = str.length;
  while ((pos < str.length) && (tagStart = findFirstUnescapedCharacter(str, searchedCharacters, pos)) !== -1)
  {
    if (insideTag && str[tagStart] !== '[')
    {
      end = tagStart;
      break;
    }
    const { tagEnd, tag } = parseTag(str, tagStart);
    if (!tag) //No tag end is found, treating rest of input as text
      break;
    if (pos !== tagStart)
      result.push(unescape(str.substring(pos, tagStart)));
    result.push(tag);
    pos = tagEnd;
  }
  if (pos < str.length)
    result.push(unescape(str.substring(pos, end)));
  return {
    result,
    end,
  };
}

/*
 * Parse a rich-text string into a rich-text AST
 */
export default function parse(str: string, fromIndex: number = 0): RichTextAST
{
  return parseString(str, fromIndex, false).result;
}
