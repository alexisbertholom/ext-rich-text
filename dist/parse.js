"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function parseTag(str, tagStart) {
    const titleStart = tagStart + 1;
    const titleEnd = utils_1.findFirstUnescapedCharacter(str, '|]', titleStart);
    if (titleEnd === -1)
        return { tagEnd: tagStart, tag: null };
    const type = unescape(str.substring(titleStart, titleEnd));
    const args = [];
    if (str[titleEnd] === ']')
        return {
            tagEnd: titleEnd + 1,
            tag: { type, args, node: null },
        };
    let pos = titleEnd + 1;
    while (true) {
        const { result, end } = parseString(str, pos, true);
        if (end >= str.length)
            return { tagEnd: tagStart, tag: null };
        args.push(result);
        pos = end + 1;
        if (str[end] === ']')
            break;
    }
    return {
        tagEnd: pos,
        tag: {
            type,
            args,
            node: args.pop() || null,
        },
    };
}
function parseString(str, fromIndex = 0, insideTag) {
    const searchedCharacters = insideTag ? '[]|' : '[';
    const result = [];
    let pos = fromIndex;
    let tagStart;
    let end = str.length;
    while ((pos < str.length) && (tagStart = utils_1.findFirstUnescapedCharacter(str, searchedCharacters, pos)) !== -1) {
        if (insideTag && str[tagStart] !== '[') {
            end = tagStart;
            break;
        }
        const { tagEnd, tag } = parseTag(str, tagStart);
        if (!tag)
            break;
        if (pos !== tagStart)
            result.push(unescape(str.substring(pos, tagStart)));
        result.push(tag);
        pos = tagEnd;
    }
    if (pos < str.length)
        result.push(unescape(str.substring(pos, end)));
    return {
        result,
        end,
    };
}
function parse(str, fromIndex = 0) {
    return parseString(str, fromIndex, false).result;
}
exports.default = parse;
//# sourceMappingURL=parse.js.map