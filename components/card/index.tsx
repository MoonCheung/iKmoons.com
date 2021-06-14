import { TagOne, CategoryManagement, ViewGridList } from '@icon-park/react';
import styles from './index.module.scss';
export default function card(props) {
  return (
    <>
      <div className={styles['card-wrap']}>
        <div className={styles['card-head']}>
          {props.icon === 'hot' ? (
            <ViewGridList className={styles['i-icon']} theme='outline' size='18' strokeWidth={4} />
          ) : props.icon === 'tag' ? (
            <TagOne className={styles['i-icon']} theme='outline' size='18' strokeWidth={4} />
          ) : props.icon === 'catg' ? (
            <CategoryManagement className={styles['i-icon']} theme='outline' size='18' strokeWidth={4} />
          ) : null}
          <div className={styles['head-title']}>{props.title}</div>
        </div>
        <div className='card-list'>{props.children}</div>
      </div>
    </>
  );
}
