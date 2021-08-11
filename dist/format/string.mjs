import parse from '../parse';
import { formatAST } from './ast';
function identity(item) {
    return item;
}
function _mergeStrings(strings) {
    return strings.join('');
}
export function formatToString(ast, opts = {}) {
    const { formatString, handlers } = opts;
    return formatAST(ast, {
        formatString: formatString || identity,
        mergeNodeContents: _mergeStrings,
        handlers,
    });
}
export default function format(str, handlers) {
    return formatToString(parse(str), { handlers });
}
export function strip(str) {
    return format(str);
}
//# sourceMappingURL=string.js.map