"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const escape_1 = require("./escape");
function formatTag(tag) {
    const { type, args, node } = tag;
    const _args = node ? args.concat([node]) : args;
    const parsedArgs = _args.map(arg => _build(arg));
    const contents = [escape_1.default(type)].concat(parsedArgs).join('|');
    return `[${contents}]`;
}
function formatNode(node) {
    return types_1.isTag(node) ? (formatTag(node)) : (escape_1.default(node));
}
function _build(args) {
    return args.reduce((result, node) => (result + formatNode(node)), '');
}
function build(...args) {
    return _build(args);
}
exports.default = build;
;
function isSHTag(node) {
    return Array.isArray(node);
}
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
    return isSHTag(node) ? (translateSHTag(node)) : node;
}
function translateSHParsedString(args) {
    if (typeof (args) === 'string')
        return [args];
    return args.map(translateSHNode);
}
function shorthandBuild(...args) {
    return _build(translateSHParsedString(args));
}
exports.shorthandBuild = shorthandBuild;
//# sourceMappingURL=build.js.map