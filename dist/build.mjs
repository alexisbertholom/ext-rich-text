import { isTag } from './types';
import escape from './escape';
function formatTag(tag) {
    const { type, args, node } = tag;
    const _args = node ? args.concat([node]) : args;
    const parsedArgs = _args.map(arg => _build(arg));
    const contents = [escape(type)].concat(parsedArgs).join('|');
    return `[${contents}]`;
}
function formatNode(node) {
    return isTag(node) ? (formatTag(node)) : (escape(node));
}
export function _build(args) {
    return args.reduce((result, node) => (result + formatNode(node)), '');
}
export default function build(...args) {
    return _build(args);
}
//# sourceMappingURL=build.js.map