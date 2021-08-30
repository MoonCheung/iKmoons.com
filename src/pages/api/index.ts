import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import chokidar from 'chokidar';

const postsDirectory = join(process.cwd(), './src/pages/article');

/**
 * 获取该文件名称
 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

/**
 * 获取该文件内容
 * @param {*} slug
 * @param {*} fields
 */
export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  // 读取该文件内容
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // 解构别名
  const { data: fileData } = matter.read(fullPath);
  if (!fileData?.createdAt && !fileData?.updatedAt) {
    const newFileContent = matter.stringify(fileContents, {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    // 如没有创建日期和更新日期字段，来覆盖原有文件
    fs.writeFile(fullPath, newFileContent, (err) => {
      if (err) throw err;
      console.info('日期字段已保存该文件');
    });
  }

  // 监听该文件是否有变化
  chokidar.watch(fullPath).on('change', (path, stats) => {
    if (stats) {
      // 读取该文件内容
      const fileContents = fs.readFileSync(path, 'utf8');
      const newFileContent = matter.stringify(fileContents, {
        updatedAt: new Date().toISOString()
      });
      // 更新日期字段名来覆盖原有文件
      fs.writeFileSync(path, newFileContent);
      // fs.writeFile(path, newFileContent, (err) => {
      //   if (err) throw err;
      //   console.info('更新日期字段已保存该文件');
      // });
    }
  });

  const { data, content } = matter(fileContents);
  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'router') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'origin') {
      items[field] = data[field];
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

/**
 * 获取所有文件数据
 * @param {*} fields
 */
export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by createdAt in descending order
    .sort((post1, post2) => (post1.createdAt > post2.createdAt ? '1' : '-1'));
  return posts;
}

/**
 * 用于监听文件是否有变化
 */
export function watchFilesProps() {}
