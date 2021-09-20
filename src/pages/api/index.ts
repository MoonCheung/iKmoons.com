import fs from 'fs';
import glob from 'fast-glob';
import chokidar from 'chokidar';
import { join, extname, sep } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { CONTENT_PATH } from '@/config/env.config';

const postsDirectory = join(process.cwd(), CONTENT_PATH);

/**
 * 获取该文件名称
 * @returns
 */
export function getPostSlugs() {
  return glob.sync(`${CONTENT_PATH}/**/*.mdx`);
}

/**
 * 获取所有文件路由
 * @returns
 */
export function getPostSlugPath() {
  const file = glob.sync(`${CONTENT_PATH}/**/*.mdx`);
  return file.map((path) => ({
    params: {
      slug: path
        .replace(CONTENT_PATH, '')
        .replace(/^\/+/, '')
        .replace(new RegExp(extname(path) + '$'), '')
        .split(sep)
    }
  }));
}

/**
 * 获取该文件内容
 * @param {*} slug
 * @param {*} fields
 */
export function getPostBySlug(slug, fields = []) {
  const realSlug = /\.mdx$/.test(slug) ? slug.replace(/\.mdx$/, '') : join(CONTENT_PATH, slug);
  // 读取该文件内容
  const fileContents = fs.readFileSync(`${realSlug}.mdx`, 'utf8');
  // const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  // 解构别名
  // const { data: fileData } = matter.read(slug);
  // if (!fileData?.createdAt && !fileData?.updatedAt) {
  //   const newFileContent = matter.stringify(fileContents, {
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString()
  //   });
  //   // 如没有创建日期和更新日期字段，来覆盖原有文件
  //   fs.writeFile(slug, newFileContent, (err) => {
  //     if (err) throw err;
  //     console.info('日期字段已保存该文件');
  //   });
  // }

  // // 监听该文件是否有变化
  // chokidar.watch(slug).on('change', (path, stats) => {
  //   if (stats) {
  //     // 读取该文件内容
  //     const fileContents = fs.readFileSync(path, 'utf8');
  //     const newFileContent = matter.stringify(fileContents, {
  //       updatedAt: new Date().toISOString()
  //     });
  //     // 更新日期字段名来覆盖原有文件
  //     fs.writeFileSync(path, newFileContent);
  //     // fs.writeFile(path, newFileContent, (err) => {
  //     //   if (err) throw err;
  //     //   console.info('更新日期字段已保存该文件');
  //     // });
  //   }
  // });

  const { data, content } = matter(fileContents);
  const readTime = readingTime(content);
  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'router') {
      items[field] = realSlug.replace(CONTENT_PATH, '').replace(/^\/+/, '');
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (field === 'origin') {
      items[field] = data[field];
    }
    if (field === 'readTime') {
      items[field] = readTime;
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
  // sort posts by createdAt in descending order
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.createdAt > post2.createdAt ? '1' : '-1'));
  return posts;
}

/**
 * 获取内容解析数据
 * @param param
 * @returns
 */
export function getPostItemSlug(param = '') {
  if (!param) return;
  const slugs = getPostSlugs();
  const data = slugs.flatMap((slug) => {
    const item = getPostBySlug(slug, [param]);
    return item[param];
  });

  // 新数组
  const arr = [];
  // 扁平化经过排序得到一维数组转化字符串
  const newStr = data.sort().join();
  // 提取连续重复的值
  const regex = /(.[\u4e00-\u9fa5a-zA-z]+)\1+/g;
  newStr.replace(regex, (match) => {
    return match && arr.push(match.replace(/^,/, '').split(','));
  });
  // 过滤非唯一性的值,推送到新数组
  const filterNonUnique = (flat) =>
    [...new Set(flat)].filter((i) => flat.indexOf(i) === flat.lastIndexOf(i)).forEach((item) => arr.push([item]));
  filterNonUnique(data);

  return arr;
}

/**
 * 用于监听文件是否有变化
 */
export function watchFilesProps() {}
