import parse from '../parse';
import { formatParsedString } from './ast';
function identity(item) {
    return item;
}
function _mergeStrings(strings) {
    return strings.join('');
}
export function formatToString(parsedString, opts) {
    const { formatString, handlers } = opts;
    return formatParsedString(parsedString, {
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