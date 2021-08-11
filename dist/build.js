"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._build = void 0;
const types_1 = require("./types");
const escape_1 = require("./escape");
function formatTag(tag) {
    const { type, args } = tag;
    const parsedArgs = args.map(arg => _build(arg));
    const contents = [escape_1.default(type)].concat(parsedArgs).join('|');
    return `[${contents}]`;
}
function formatNode(node) {
    return types_1.isTag(node) ? (formatTag(node)) : (escape_1.default(node));
}
function _build(args) {
    return args.reduce((result, node) => (result + formatNode(node)), '');
}
exports._build = _build;
function build(...args) {
    return _build(args);
}
exports.default = build;
//# sourceMappingURL=build.js.map