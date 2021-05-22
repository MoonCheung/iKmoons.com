import { HeadPost } from './HeadPost'

export default function BlogPost({ children, meta}) {
  return (
    <>
      <HeadPost meta={meta} isBlogPost />
      <div>测试博客文章</div>
      <article>{children}</article>
    </>
  )
}
