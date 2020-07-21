import type { ParsedString } from '../types';
import type { HandlersMap, FormatOptions } from './ast';
export declare function formatToString(parsedString: ParsedString, opts: Partial<Pick<FormatOptions<string>, 'formatString' | 'handlers'>>): string;
export default function format(str: string, handlers?: HandlersMap<string>): string;
export declare function strip(str: string): string;
