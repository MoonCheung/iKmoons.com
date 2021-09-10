import MediaList from '@/components/media/index';
import { TagOne } from '@icon-park/react';
import { getPostSlugs, getPostBySlug, getAllPosts } from '@/pages/api/index'
import styles from './index.module.scss';

export async function getStaticPaths() {
  const slugs = getPostSlugs();
  const tags = slugs.flatMap((slug) => {
    const { tags } = getPostBySlug(slug, ['tags'])
    return tags;
  })
  // 标签路由方法
  const paths = [...new Set(tags)].map((name) => ({ params: { name } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { name } }) {
  // 获取所有文件
  const posts = await getAllPosts([
    'router',
    'title',
    'description',
    'catg',
    'banner',
    'origin',
    'tags',
    'createdAt',
  ]).filter(({tags}) => tags.includes(name))

  return {
    props: {
      name,
      posts
    }
  }
}

export default function tagsPage({name, posts}) {
  return (
    <>
      <div className={styles['tags-main']}>
        <header className={styles['tags-head']}>
          <TagOne className={styles['i-icon']} theme='outline' size='48' strokeWidth={3} />
          <div className={styles['head-name']}>{name.toUpperCase()}</div>
          <div className={styles['head-count']}>共搜索到&nbsp;{ posts?.length || 0 }&nbsp;篇文章</div>
        </header>
        <article className={styles['tags-list']}>
          <MediaList posts={posts} />  
        </article>
      </div>
    </>
  );
}
