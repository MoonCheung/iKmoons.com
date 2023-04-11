import fs from 'fs';
export const CODE_BLOCK_FILENAME_REGEX = /filename="([^"]+)"/;

export const shikiOptions = {
  // theme: JSON.parse(fs.readFileSync(require.resolve('./highlight.json'), 'utf-8')),
  theme: 'dark-plus',
  keepBackground: true,
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node: any) {
    node.properties.className = ['highlighted'];
  },
  filterMetaString: (meta: string) => meta.replace(CODE_BLOCK_FILENAME_REGEX, '')
};
