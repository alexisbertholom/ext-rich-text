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
  args: Array<RichTextAST>,
};

export type Node = string | Tag;

/*
 * A RichTextAST is the AST representation of a rich-text string, composed of one or more Node
 */
export type RichTextAST = Array<Node>;

export interface ReadonlyTag
{
  readonly type: string,
  readonly args: ReadonlyArray<ReadonlyRichTextAST>,
}
export type ReadonlyNode = string | ReadonlyTag;
export type ReadonlyRichTextAST = ReadonlyArray<ReadonlyNode>;

export function isTag(node: Node): node is Tag
export function isTag(node: ReadonlyNode): node is ReadonlyTag
export function isTag(node: ReadonlyNode): node is Tag
{
  return (node as ReadonlyTag).type !== undefined;
}


//Shorthand (SH) variation of the AST types:

export type SHTag = [ string, ...(SHRichTextAST | string)[] ];
export type SHNode = string | SHTag;
export type SHRichTextAST = Array<SHNode>;

export type ReadonlySHTag = Readonly<[ string, ...(ReadonlySHRichTextAST | string)[] ]>;
export type ReadonlySHNode = string | ReadonlySHTag;
export type ReadonlySHRichTextAST = ReadonlyArray<ReadonlySHNode>;

export function isSHTag(node: SHNode): node is SHTag
export function isSHTag(node: ReadonlySHNode): node is ReadonlySHTag
export function isSHTag(node: ReadonlySHNode): node is SHTag
{
  return Array.isArray(node);
}
