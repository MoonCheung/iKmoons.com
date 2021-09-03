import dayjs from 'dayjs';
import { getAllCatg } from '@/pages/api/catg'
import Card from '@/components/card/index';
import { originState, originColor } from '@/utils/index';
import { ListCheckbox } from '@icon-park/react';
// import { MDXProvider } from '@next/mdx'
import { MDXRemote } from 'next-mdx-remote'
import { getMdxContent } from '@/utils/content'
import styles from './index.module.scss';

// 自定义组件
const components = {}
export async function getStaticPaths() {
  const posts = await getMdxContent('./src/pages/content');
  const paths = posts.map(({ slug }) => ({
    params: {
      slug: slug.split('/'),
    },
  }));

  return {
    paths,
    fallback: false,
  }
}
export async function getStaticProps({ params: { slug } }) {
  const posts = await getMdxContent('./src/pages/content');
  const postSlug = slug.join('/');
  const [ post ] = posts.filter((post) => post.slug === postSlug);

  if (!post) {
    console.warn(`没有找到 slug 的内容:${postSlug}`);
  }
  return { 
    props: { 
      source: post.source, 
      frontMatter: post.data 
    } 
  }
}

export default function article({ source, frontMatter }){
  // console.log('watch frontMatter:', frontMatter)
  return (
    <>
      <article className='flex flex-row justify-start'>
        <div className={styles["art-wrap"]}>
          {/* <div className="art-fixed">固定</div> */}
          <div className={styles['art-main']}>
            <span className={styles['art-origin']} style={originColor(frontMatter.origin)}>{originState(frontMatter.origin)}</span>
            <div className={styles['art-head']}>
              <h2 className={styles['head-title']}>{frontMatter.title}</h2>
              <div className={styles['head-level']}>
                <ListCheckbox theme='outline' size='12' strokeWidth={4} />
                <span>{frontMatter.catg}</span>
                <span>阅读时间:{Math.round(frontMatter.readTime.minutes)}分钟</span>
                <span>字数:{frontMatter.readTime.words}</span>
              </div>
            </div>
            <div className={styles['art-body']}>
              <img className={styles['body-img']} src={frontMatter.banner} alt='banner' />
              <div className={styles['markdown-body']}>
                <MDXRemote {...source} components={components} />
              </div>
            </div>
            <div className={styles['art-foot']}>
              <div className={styles['foot-one']}>发布时间:{dayjs(frontMatter.createdAt).format('YYYY年MM月DD日')}</div>
              <div className={styles['foot-two']}>
                相关标签:
                {frontMatter.tags.map((item, index) => (
                  <a className={styles['two-tag']} key={index} href={`/tags/${item}`} title={item}>
                    {item}
                  </a>
                ))}
              </div>
              <div className={styles['foot-three']}>
                版权声明:
                <span>自由转载-署名-非商用&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <a
                  rel='license'
                  target='_blank'
                  className={styles['foot-link']}
                  href='http://creativecommons.org/licenses/by-nc/3.0/cn/'>
                  CC BY-NC 3.0 CN
                </a>
              </div>
            </div>
          </div>
        </div>
        <aside className={styles['art-aside']}>
          <Card icon='catg' title='分类'>
            <div className='card-item'>hello 嵌套组件1</div>
            <div className='card-item'>hello 嵌套组件2</div>
            <div className='card-item'>hello 嵌套组件3</div>
            <div className='card-item'>hello 嵌套组件4</div>
          </Card>
        </aside>
      </article>
    </>
  )
}
