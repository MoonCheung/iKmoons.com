import { People, Like, Config, TagOne } from '@icon-park/react';
import { constant } from '../../config/app.config';
import styles from './index.module.scss';
export default function aboutPage({ posts }) {
  const { about } = constant;

  return (
    <>
      <div className={styles['about-wrap']}>
        <div className={styles['about-main']}>
          <div className={styles['about-info']}>
            <header className={styles['info-head']}>
              <img className={styles['info-image']} src='https://static.ikmoons.com/头像.png' alt='头像' />
              <p className={styles['info-name']}>{about.name}</p>
            </header>
            <div className={styles['middleLine-level']}>
              <h2 className={styles['middleLine-text']}>关于我</h2>
            </div>
            <div className={styles['info-wrap']}>
              <ul className={styles['info-list']}>
                <li className={styles['info-item']}>
                  <People className={styles['i-icon']} theme='filled' size='16' fill='var(--cyan)' strokeWidth={3} />
                  <span className={styles['info-desc']}>{about.desc}</span>
                </li>
                <li className={styles['info-item']}>
                  <Like className={styles['i-icon']} theme='filled' size='16' fill='var(--red)' strokeWidth={3} />
                  <span className={styles['info-desc']}>
                    {about.hobby.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </span>
                </li>
                <li className={styles['info-item']}>
                  <Config
                    className={styles['i-icon']}
                    theme='filled'
                    size='16'
                    fill='var(--turquoise)'
                    strokeWidth={3}
                  />
                  <span className={styles['info-desc']}>
                    {about.skill.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </span>
                </li>
                <li className={styles['info-item']}>
                  <TagOne className={styles['i-icon']} theme='filled' size='16' fill='var(--green)' strokeWidth={3} />
                  <span className={styles['info-desc']}>
                    {about.tags.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles['about-chart']}>
            <img className={styles['chart-image']} src='http://ghchart.rshah.org/MoonCheung' alt='My github chart' />
          </div>
        </div>
        <aside className={styles['about-aside']}>
          <div className={styles['about-icon']}>
            <div className={styles['middleLine-level']}>
              <h2 className={styles['middleLine-text']}>联系我</h2>
            </div>
            <div className={styles['icon-wrap']}>
              <ul className={styles['icon-list']}>
                <li className={styles['icon-item']}>
                  <a className='icon-link' href='mailto:salvador23@163.com'>
                    邮件
                  </a>
                </li>
                <li className={styles['icon-item']}>
                  <a className='icon-link' target='_blank' href='https://github.com/MoonCheung'>
                    Github
                  </a>
                </li>
                <li className={styles['icon-item']}>
                  <a className='icon-link' target='_blank' href='https://juejin.im/user/57df412ba0bb9f0058a3f23a'>
                    掘金
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
