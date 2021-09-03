import path from 'path';
import glob from 'fast-glob';
import matter from 'gray-matter';
import { promises as fs } from 'fs';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize'

export function getMdxContent(param) {
  const contentGlob = `${param}/**/*.mdx`;
  const files = glob.sync(contentGlob);

  if (!files.length) return [];

  const content = Promise.all(
    files.map(async (filepath) => {
      const slug = filepath.replace(param, '').replace(/^\/+/, '').replace(new RegExp(path.extname(filepath) + '$'), '');

      const mdxSource = await fs.readFile(filepath);
      const { content, data } = matter(mdxSource);
      const readTime = readingTime(content)
      const source = await serialize(content, { scope: data });

      return {
        filepath,
        slug,
        content,
        source,
        data: {
          ...data,
          readTime
        },
      };
    }),
  );
  return content;
}