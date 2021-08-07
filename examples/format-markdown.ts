import type { HandlersMap } from '../src/';

import { format, formatAST, formatToString } from '../src/';
import {
  SimpleBoldText,
  TagWithArg,
  NestedTags,
  Linebreak,
} from './serialized-rich-text-strings';

const MarkdownHandlers: HandlersMap<string> = {
  bold: ([ text ], opts) => `**${formatAST(text, opts)}**`,
  link: ([ url, text ], opts) => `[${formatAST(text, opts)}](${formatToString(url)})`,
  "line-break": () => '  \n',
};

function log(richTextString: string)
{
  console.log(richTextString);
  console.log('=>')
  console.log(format(richTextString, MarkdownHandlers));
  console.log();
}

log(SimpleBoldText);
log(TagWithArg);
log(NestedTags);
log(Linebreak);
