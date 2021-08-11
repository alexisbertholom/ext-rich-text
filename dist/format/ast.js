"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAST = void 0;
const types_1 = require("../types");
function formatTag(tag, opts) {
    const { handlers } = opts;
    const { type, args } = tag;
    if (handlers) {
        const handler = handlers[type];
        if (handler)
            return handler(args, opts);
    }
    if (args.length > 0) {
        const lastArg = args[args.length - 1];
        return formatAST(lastArg, opts);
    }
    return null;
}
function formatNode(node, opts) {
    const { formatString } = opts;
    return types_1.isTag(node) ? (formatTag(node, opts)) : (formatString(node));
}
function formatAST(ast, opts) {
    const { mergeNodeContents } = opts;
    const contents = new Array();
    for (const node of ast) {
        const content = formatNode(node, opts);
        if (content)
            contents.push(content);
    }
    return mergeNodeContents(contents);
}
exports.formatAST = formatAST;
//# sourceMappingURL=ast.js.map