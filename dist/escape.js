"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unescape = void 0;
const EscapeRegExp = new RegExp('[[|\\]]', 'g');
function escape(str) {
    return str.replace(EscapeRegExp, '\\$&');
}
exports.default = escape;
const UnescapeRegExp = new RegExp('\\\\([[|\\]])', 'g');
function unescape(str) {
    return str.replace(UnescapeRegExp, '$1');
}
exports.unescape = unescape;
//# sourceMappingURL=escape.js.map