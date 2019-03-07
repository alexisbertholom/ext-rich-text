import { ParsedString } from './types';
export default function build(...args: ParsedString): string;
declare type SHTag = [string, ...(SHParsedString | string)[]];
declare type SHNode = string | SHTag;
interface SHParsedString extends Array<SHNode> {
}
export declare function shorthandBuild(...args: SHParsedString): string;
export {};
