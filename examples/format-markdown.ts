import { format } from '../src/';
import {
  SimpleBoldText,
  TagWithArg,
  NestedTags,
  Linebreak,
} from './serialized-rich-text-strings';

const MarkdownHandlers = new Map([
  [ 'bold', (text: string) => `**${text}**` ],
  [ 'link', (url: string, text: string) => `[${text}](${url})` ],
  [ 'line-break', () => '  \n' ],
]);

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
