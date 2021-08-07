/*
 * The AST representation of a tag.
 *
 * A tag has a `type`, and 0 or more `args`.
 *
 * Example: [img|picture-url|alt-text]
 * In this example, `img` is the type, `picture-url` is the 1st arg, `alt-text` is 2nd arg.
 *
 * The type of the tag determines how to handle it.
 * The args are attributes specific to the tag type.
 * If a tag type is unhandled, its last arg, if specified, is used as a fallback content.
 */
export interface Tag
{
  type: string,
  args: Array<ParsedString>,
};

export type Node = string | Tag;

/*
 * A ParsedString is the AST representation of a rich-text string, composed of one or more Node
 */
export type ParsedString = Array<Node>;

export function isTag(node: Node): node is Tag
{
  return (node as Tag).type !== undefined;
}


//Shorthand (SH) variation of the AST types:

export type SHTag = [ string, ...(SHParsedString | string)[] ];
export type SHNode = string | SHTag;
export type SHParsedString = Array<SHNode>;

export function isSHTag(node: SHNode): node is SHTag
{
  return Array.isArray(node);
}
