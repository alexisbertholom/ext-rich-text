export interface Tag
{
  type: string,
  args: Array<ParsedString>,
  node: ParsedString | null,
};

export type Node = string | Tag;

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
