const EscapeRegExp = new RegExp('[[|\\]]', 'g');
export default function escape(str) {
    return str.replace(EscapeRegExp, '\\$&');
}
const UnescapeRegExp = new RegExp('\\\\([[|\\]])', 'g');
export function unescape(str) {
    return str.replace(UnescapeRegExp, '$1');
}
//# sourceMappingURL=escape.js.map