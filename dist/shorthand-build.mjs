import { isSHTag } from './types';
import { _build } from './build';
function translateSHTag(tag) {
    const [type, ..._args] = tag;
    const args = _args.map(translateSHRichTextAST);
    return {
        type,
        args,
    };
}
function translateSHNode(node) {
    return isSHTag(node) ? (translateSHTag(node)) : node;
}
function translateSHRichTextAST(args) {
    if (typeof (args) === 'string')
        return [args];
    return args.map(translateSHNode);
}
export default function shorthandBuild(...args) {
    return _build(translateSHRichTextAST(args));
}
//# sourceMappingURL=shorthand-build.js.map