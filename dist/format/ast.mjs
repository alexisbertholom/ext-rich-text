import { isTag } from '../types';
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
    return isTag(node) ? (formatTag(node, opts)) : (formatString(node));
}
export function formatAST(ast, opts) {
    const { mergeNodeContents } = opts;
    const contents = new Array();
    for (const node of ast) {
        const content = formatNode(node, opts);
        if (content)
            contents.push(content);
    }
    return mergeNodeContents(contents);
}
//# sourceMappingURL=ast.js.map