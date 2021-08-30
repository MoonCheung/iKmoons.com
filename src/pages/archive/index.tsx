import styles from './index.module.scss';
export default function archivePage({ posts }) {
  return (
    <>
      <div className={styles['archive-wrap']}>
        <div className={styles['archive-main']}>
          <div className={styles['archive-head']}>关于我</div>
          <div className={styles['archive-list']}>图表</div>
        </div>
        <aside className={styles['archive-aside']}>联系我</aside>
      </div>
    </>
  );
}
