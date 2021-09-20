import { constant } from '@/config/app.config';
import MediaList from '@/components/media/index';
import { CategoryManagement } from '@icon-park/react';
import { getAllPosts } from '@/pages/api/index';
import styles from './index.module.scss';

export async function getStaticPaths() {
  // 分类路由方法
  const paths = constant.catgIcon.map(({ name }) => ({ params: { name } }));
  return {
    paths,
    fallback: false
  };
}
export async function getStaticProps({ params: { name } }) {
  // 获取所有文件
  const posts = await getAllPosts(['router', 'title', 'description', 'catg', 'banner', 'origin', 'createdAt']).filter(
    ({ catg }) => catg === name
  );

  return {
    props: {
      name,
      posts
    }
  };
}
export default function catgPage({ name, posts }) {
  return (
    <>
      <div className={styles['catg-main']}>
        <header className={styles['catg-head']}>
          <CategoryManagement className={styles['i-icon']} theme='outline' size='48' strokeWidth={3} />
          <div className={styles['head-name']}>{name}</div>
          <div className={styles['head-count']}>共搜索到&nbsp;{posts?.length || 0}&nbsp;篇文章</div>
        </header>
        <article className={styles['catg-list']}>
          <MediaList posts={posts} name={name} />
        </article>
      </div>
    </>
  );
}
