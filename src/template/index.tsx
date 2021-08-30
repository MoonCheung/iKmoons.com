import dayjs from 'dayjs';
import { getAllPosts } from '@/pages/api/index';
import Card from '@/components/card/index';
import { originState, originColor } from '@/utils/index';
import { ListCheckbox } from '@icon-park/react';
import styles from './index.module.scss';

export default function content({ children, frontMatter }) {
  // React hooks, for example `useState` or `useEffect`, go here.
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
                <span>阅读时间:{Math.round(frontMatter.readingTime.minutes)}分钟</span>
                <span>字数:{frontMatter.readingTime.words}</span>
              </div>
            </div>
            <div className={styles['art-body']}>
              <img className={styles['body-img']} src={frontMatter.banner} alt='banner' />
              <div className={styles['markdown-body']}>{children}</div>
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
  );
}
