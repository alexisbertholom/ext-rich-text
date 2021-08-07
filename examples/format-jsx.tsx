import * as React from 'react';
import { parse, formatAST, formatToString } from '../src/';
import {
  SimpleBoldText,
} from './serialized-rich-text-strings';

type RenderType = JSX.Element | string | null | Array<RenderType>;

const elements = formatAST<RenderType>(parse(SimpleBoldText), {
  formatString: (s: string) => s,
  mergeNodeContents: (contents: Array<RenderType>) => contents,
  handlers: {
    bold: ([ text ], opts) => (<b>{formatAST(text, opts)}</b>),
    link: ([ url, text ], opts) => (
      <a href={formatToString(url)}>
        {formatAST(text, opts)}
      </a>
    ),
    "line-break": () => (<br/>),
  },
});

console.log(elements);
