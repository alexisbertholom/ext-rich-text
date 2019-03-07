"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escape(str) {
    return str.replace(/[[|\]]/g, '\\$&');
}
exports.default = escape;
function unescape(str) {
    return str.replace(/\\([[|\]])/g, '$1');
}
exports.unescape = unescape;
//# sourceMappingURL=escape.js.map