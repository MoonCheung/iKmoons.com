import Link from 'next/link';
import dayjs from 'dayjs';
import { useState } from 'react';
import { originState, originColor } from '@/utils/index';
import { ListCheckbox, Time } from '@icon-park/react';
import styles from './index.module.scss';

const Articles = ({ post }) => {
  return (
    <>
      <div className={styles.media} key={post}>
        <div className={styles['media-left']}>
          <figure className={styles.image}>
            <img src={post.banner} alt='Placeholder image' />
          </figure>
        </div>
        <div className={styles['media-content']}>
          <Link href={`/article/${post.router}`}>
            <a href={`/article/${post.router}`} className={styles['media-link']} title={post.title}>
              <h2 className={styles['link-header']}>{post.title}</h2>
              <p className={styles['link-content']}>{post.description}</p>
            </a>
          </Link>
          <div className={styles['media-level']}>
            <div className={styles['level-left']}>
              <ListCheckbox theme='outline' size='14' strokeWidth={4} />
              <span>{post.catg}</span>
              {/* <span>{item.readTime}</span> */}
              {/* <span>323 次阅读</span>
              <span>1 人喜欢</span>
              <span>0 评论</span> */}
            </div>
            <div className={styles['level-right']}>
              <Time theme='outline' size='14' strokeWidth={4} />
              <time className={styles['right-time']}>{dayjs(post.createdAt).format('YYYY年MM月DD日')}</time>
              <span className={styles['right-origin']} style={originColor(post.origin)}>
                {originState(post.origin)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function medialist({ posts }) {
  const [fullArticle, setFullArticle] = useState(false);
  const runCallback = (fn) => fn();

  return (
    <>
      <section className={styles.section}>
        <div className='container flex flex-col items-center justify-start'>
          {fullArticle ? (
            <>
              {posts && posts.length ? (
                posts.map((item, index) => <Articles post={item} key={index} />)
              ) : (
                <div className={styles['no-media']}>暂无文章，请你小憩一会儿～🙂</div>
              )}
            </>
          ) : (
            <>
              {posts && posts.length ? (
                <>
                  {runCallback(() => {
                    const row = [];
                    for (let i = 0; i < posts.length; i++) {
                      if (i <= 4) row.push(<Articles post={posts[i]} key={i} />);
                    }
                    return row;
                  })}
                </>
              ) : (
                <div className={styles['no-media']}>暂无文章，请你小憩一会儿～🙂</div>
              )}
              {posts && posts.length ? (
                <button className={styles.btn} onClick={() => setFullArticle(true)}>
                  查看更多
                </button>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
}
