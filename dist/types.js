"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSHTag = exports.isTag = void 0;
;
function isTag(node) {
    return node.type !== undefined;
}
exports.isTag = isTag;
function isSHTag(node) {
    return Array.isArray(node);
}
exports.isSHTag = isSHTag;
//# sourceMappingURL=types.js.map