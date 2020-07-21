"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const build_1 = require("./build");
function translateSHTag(tag) {
    const [type, ..._args] = tag;
    const args = _args.map(translateSHParsedString);
    return {
        type,
        args,
        node: args.pop() || null,
    };
}
function translateSHNode(node) {
    return types_1.isSHTag(node) ? (translateSHTag(node)) : node;
}
function translateSHParsedString(args) {
    if (typeof (args) === 'string')
        return [args];
    return args.map(translateSHNode);
}
function shorthandBuild(...args) {
    return build_1._build(translateSHParsedString(args));
}
exports.default = shorthandBuild;
//# sourceMappingURL=shorthand-build.js.map