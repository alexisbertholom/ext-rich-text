"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("./parse");
const types_1 = require("./types");
function formatTag(tag, handlers) {
    const { type, args, node } = tag;
    const textValue = node && formatParsedString(node, handlers);
    if (handlers) {
        const handler = handlers.get(type);
        if (handler) {
            const parsedArgs = args.map(arg => formatParsedString(arg, handlers));
            return handler(textValue, ...parsedArgs);
        }
    }
    return textValue || '';
}
function formatNode(node, handlers) {
    return types_1.isTag(node) ? (formatTag(node, handlers)) : (node);
}
function formatParsedString(parsedString, handlers) {
    return parsedString.reduce((result, node) => (result + formatNode(node, handlers)), '');
}
function format(str, handlers) {
    return formatParsedString(parse_1.default(str), handlers);
}
exports.default = format;
function strip(str) {
    return format(str);
}
exports.strip = strip;
//# sourceMappingURL=format.js.map