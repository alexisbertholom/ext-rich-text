/*
 * The AST representation of a tag.
 *
 * A tag has a type.
 * It can have 0 or more string attributes.
 * The last of these attributes is the `node`.
 * The other ones are the `args`.
 *
 * Example: [img|picture-url|alt-text]
 * In this example, `img` is the type, `picture-url` is the only arg, and `alt-text` is the node.
 *
 * The type of the tag determines how to handle it.
 * The args are attributes specific to the tag type.
 * The node, if defined, is used as a fallback is the tag type is unhandled.
 */
export interface Tag
{
  type: string,
  args: Array<ParsedString>,
  node: ParsedString | null,
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

//interface used instead of type to prevent typescript's type aliases circular references
export interface SHParsedString extends Array<SHNode> {};

export function isSHTag(node: SHNode): node is SHTag
{
  return Array.isArray(node);
}
