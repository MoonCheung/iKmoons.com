import { getPostSlugs, getPostBySlug } from '@/pages/api/index'
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
  return { 
    props: {
      name
    } 
  }
}

export default function tagsPage({name}) {
  return (
    <>
      <div>hello 这是标签: {name}</div>
    </>
  );
}
