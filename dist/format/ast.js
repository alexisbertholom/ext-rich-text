"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatParsedString = void 0;
const types_1 = require("../types");
function formatTag(tag, opts) {
    const { handlers } = opts;
    const { type, args, node } = tag;
    const content = (node === null) ? null : formatParsedString(node, opts);
    if (handlers) {
        const handler = handlers.get(type);
        if (handler) {
            const parsedArgs = args.map(arg => formatParsedString(arg, opts));
            return handler(content, ...parsedArgs);
        }
    }
    return content;
}
function formatNode(node, opts) {
    const { formatString } = opts;
    return types_1.isTag(node) ? (formatTag(node, opts)) : (formatString(node));
}
function formatParsedString(parsedString, opts) {
    const { mergeNodeContents } = opts;
    const contents = new Array();
    for (const node of parsedString) {
        const content = formatNode(node, opts);
        if (content)
            contents.push(content);
    }
    return mergeNodeContents(contents);
}
exports.formatParsedString = formatParsedString;
//# sourceMappingURL=ast.js.map