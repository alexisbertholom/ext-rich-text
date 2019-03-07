"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function escape(str) {
    return str.replace('[', '\\[').replace(']', '\\]').replace('|', '\\|');
}
exports.default = escape;
function unescape(str) {
    return str.replace('\\[', '[').replace('\\]', ']').replace('\\|', '|');
}
exports.unescape = unescape;
//# sourceMappingURL=escape.js.map