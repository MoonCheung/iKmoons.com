import Link from 'next/link';
import { Outdoor, BookOne, SettingTwo, Code } from '@icon-park/react';
import styles from './index.module.scss';

export default function levelcard({ posts }) {
  return (
    <>
      <header className={styles.header}>
        <div className='container flex flex-row items-center justify-between'>
          {posts.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles['card-wrap']}>
                <Link href='/'>
                  <a className={styles['card-link']} title='link'>
                    <img className={styles['card-img']} src={item.link} />
                    <div className={styles['card-item']}>
                      {item.icon === 'Outdoor' ? (
                        <Outdoor className={styles['i-icon']} theme='outline' size='28' strokeWidth={4} />
                      ) : item.icon === 'BookOne' ? (
                        <BookOne className={styles['i-icon']} theme='outline' size='28' strokeWidth={4} />
                      ) : item.icon === 'SettingTwo' ? (
                        <SettingTwo className={styles['i-icon']} theme='outline' size='28' strokeWidth={4} />
                      ) : item.icon === 'Code' ? (
                        <Code className={styles['i-icon']} theme='outline' size='28' strokeWidth={4} />
                      ) : null}
                      <span className={styles['card-title']}>{item.name}</span>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </header>
    </>
  );
}