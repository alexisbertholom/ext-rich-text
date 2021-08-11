"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strip = exports.formatToString = void 0;
const parse_1 = require("../parse");
const ast_1 = require("./ast");
function identity(item) {
    return item;
}
function _mergeStrings(strings) {
    return strings.join('');
}
function formatToString(ast, opts = {}) {
    const { formatString, handlers } = opts;
    return ast_1.formatAST(ast, {
        formatString: formatString || identity,
        mergeNodeContents: _mergeStrings,
        handlers,
    });
}
exports.formatToString = formatToString;
function format(str, handlers) {
    return formatToString(parse_1.default(str), { handlers });
}
exports.default = format;
function strip(str) {
    return format(str);
}
exports.strip = strip;
//# sourceMappingURL=string.js.map