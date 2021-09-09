import dayjs from 'dayjs';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote'
import Card from '@/components/card/index';
import { getAllCatg } from '@/pages/api/catg'
import { constant } from '@/config/app.config'
import { ListCheckbox } from '@icon-park/react';
import { serialize } from 'next-mdx-remote/serialize'
import { originState, originColor } from '@/utils/index';
import { Outdoor, BookOne, SettingTwo, Code } from '@icon-park/react';
import { getPostSlugPath, getPostBySlug, getPostItemSlug } from '@/pages/api/index'
import styles from './index.module.scss';

// 自定义组件
const components = {}
export async function getStaticPaths() {
  const paths = await getPostSlugPath()
  return {
    paths,
    fallback: false,
  }
}
export async function getStaticProps({ params: { slug } }) {
  const postSlug = slug.join('/');
  const {content, ...data} = await getPostBySlug(postSlug,[
    'title',
    'description',
    'origin',
    'catg',
    'tags',
    'readTime',
    'banner',
    'content',
    'createdAt',
  ])
  // 获取所有分类方法
  const catg = await getPostItemSlug('catg').reduce((acc,cur) => {
    const key = [...new Set(cur)]; 
    acc[key] = cur.length 
    return  acc;
  },{})

  if (!content) {
    console.warn(`没有找到 slug 的内容:${postSlug}`);
  }

  const source = await serialize(content, { scope: data });

  return { 
    props: { 
      source,
      catg,
      frontMatter:{
        ...data
      }
    } 
  }
}

export default function article({ source, frontMatter, catg}){
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
          {constant.catgIcon.map(({name, icon}, index) => (
            <Link href={`/catg/${name}`} key={index}>
              <a className={styles['card-item']}>
                <span className={styles["name"]}>
                  {icon === 'Outdoor' ? (
                    <Outdoor className={styles['i-icon']} theme='outline' size='16' strokeWidth={4} />
                  ) : icon === 'BookOne' ? (
                    <BookOne className={styles['i-icon']} theme='outline' size='16' strokeWidth={4} />
                  ) : icon === 'SettingTwo' ? (
                    <SettingTwo className={styles['i-icon']} theme='outline' size='16' strokeWidth={4} />
                  ) : icon === 'Code' ? (
                    <Code className={styles['i-icon']} theme='outline' size='16' strokeWidth={4} />
                  ) : null}
                  {name}
                </span>
                <span className={styles["count"]}>共{ catg[name] || 0 }篇文章</span>
              </a>
            </Link>
          ))}
          </Card>
        </aside>
      </article>
    </>
  )
}
