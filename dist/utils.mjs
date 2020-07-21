export function findFirstUnescapedCharacter(str, searchedCharacters, fromIndex = 0) {
    if (searchedCharacters.length > 1) {
        const results = searchedCharacters.split('').map(character => (findFirstUnescapedCharacter(str, character, fromIndex))).filter(index => (index !== -1));
        return results.length > 0 ? (results.reduce((min, value) => Math.min(min, value))) : -1;
    }
    let pos = fromIndex;
    while ((pos = str.indexOf(searchedCharacters, pos)) !== -1)
        if ((pos === 0) || (str[pos - 1] !== '\\'))
            return pos;
    return -1;
}
//# sourceMappingURL=utils.js.map