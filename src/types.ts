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
