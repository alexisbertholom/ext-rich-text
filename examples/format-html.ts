import { format } from '../src/';
import {
  SimpleBoldText,
  TagWithArg,
  NestedTags,
  Linebreak,
} from './serialized-rich-text-strings';

const HTMLHandlers = new Map([
  [ 'bold', (text: string) => `<b>${text}</b>` ],
  [ 'link', (url: string, text: string) => `<a href=${url}>${text}</a>` ],
  [ 'line-break', () => '<br>' ],
]);

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
