import type { HandlersMap } from '../src/';

import { format, formatAST, formatToString } from '../src/';
import {
  SimpleBoldText,
  TagWithArg,
  NestedTags,
  Linebreak,
} from './serialized-rich-text-strings';

const HTMLHandlers: HandlersMap<string> = {
  bold: ([ text ], opts) => `<b>${formatAST(text, opts)}</b>`,
  link: ([ url, text ], opts) => `<a href=${formatToString(url)}>${formatAST(text, opts)}</a>`,
  "line-break": () => '<br>',
};

function log(richTextString: string)
{
  console.log(richTextString);
  console.log('=>')
  console.log(format(richTextString, HTMLHandlers));
  console.log();
}

log(SimpleBoldText);
log(TagWithArg);
log(NestedTags);
log(Linebreak);
