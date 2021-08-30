import Link from 'next/link';
import dayjs from 'dayjs';
import { originState,originColor } from '@/utils/index';
import { ListCheckbox, Time } from '@icon-park/react';
import styles from './index.module.scss';

export default function medialist({ posts }) {
  return (
    <>
      <section className={styles.section}>
        <div className='container flex flex-col items-center justify-start'>
          {posts.map((item, index) => (
            <div className={styles.media} key={index}>
              <div className={styles['media-left']}>
                <figure className={styles.image}>
                  <img src={item.banner} alt='Placeholder image' />
                </figure>
              </div>
              <div className={styles['media-content']}>
                <Link href={`/article/${item.router}`}>
                  <a className={styles['media-link']} title={item.title}>
                    <h2 className={styles['link-header']}>{item.title}</h2>
                    <p className={styles['link-content']}>{item.description}</p>
                  </a>
                </Link>
                <div className={styles['media-level']}>
                  <div className={styles['level-left']}>
                    <ListCheckbox theme='outline' size='14' strokeWidth={4} />
                    <span>{item.catg}</span>
                    {/* <span>{item.readTime}</span> */}
                    {/* <span>323 次阅读</span>
                    <span>1 人喜欢</span>
                    <span>0 评论</span> */}
                  </div>
                  <div className={styles['level-right']}>
                    <Time theme='outline' size='14' strokeWidth={4} />
                    <time className={styles['right-time']}>{dayjs(item.createdAt).format('YYYY年MM月DD日')}</time>
                    <span className={styles['right-origin']} style={originColor(item.origin)}>{originState(item.origin)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className={styles.btn}>下一页</button>
        </div>
      </section>
    </>
  );
}
