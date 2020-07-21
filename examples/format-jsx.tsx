import * as React from 'react';
import { parse, formatParsedString } from '../src/';
import {
  SimpleBoldText,
} from './serialized-rich-text-strings';

type RenderType = JSX.Element | string | null | Array<RenderType>;

const elements = formatParsedString<RenderType>(parse(SimpleBoldText), {
  formatString: (s: string) => s,
  mergeNodeContents: (contents: Array<RenderType>) => contents,
  handlers: new Map([
    [ 'bold' , (text: NodeContentT) => (<b>{text}</b>) ],
    [ 'link', (url: string, text: NodeContentT) => (<a href={url}>{text}</a>) ],
    [ 'line-break', () => (<br/>) ],
  ]),
});

console.log(elements);
