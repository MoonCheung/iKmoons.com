import { constant } from '@/config/app.config'
import styles from './index.module.scss';

export async function getStaticPaths() {
  // 分类路由方法
  const paths = constant.catgIcon.map(({name}) => ({ params: { name } }))
  return {
    paths,
    fallback: false,
  }
}
export async function getStaticProps({ params: { name } }) {
  console.log('watch route slug:', name)
  return { 
    props: {
      name
    } 
  }
}
export default function catgPage({ posts }) {
  return (
    <>
      <div>hello 这是分类</div>
    </>
  );
}
