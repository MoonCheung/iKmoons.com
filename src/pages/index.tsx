import Link from 'next/link';
import Card from '@/components/card/index';
import MediaList from '@/components/media/index';
import LevelCard from '@/components/levelcard/index';
import { getAllPosts, getPostItemSlug } from './api/index';
import { constant } from '@/config/app.config';

// 该页面导出该方法返回props
export async function getStaticProps() {
  const posts = await getAllPosts([
    'router',
    'title',
    'description',
    'catg',
    'banner',
    'origin',
    'createdAt',
  ]);
  // 获取所有标签方法
  const allTag = await getPostItemSlug('tags').map((item,index) => ({
    name: Array.from(new Set(item)).join().toUpperCase(),
    router: Array.from(new Set(item)).join(),
    len: item.length
  }))

  return {
    props: {
      posts,
      allTag
    }
  };
}

export default function IndexPage({ posts,allTag }) {
  return (
    <>
      <article className='container flex justify-start'>
        <div className='main-wrap'>
          <LevelCard posts={constant.catgIcon} />
          <MediaList posts={posts} />
        </div>
        <div className='aside'>
          <Card icon='tag' title='标签'>
            {allTag.map((item,index) => (
              <Link href={`/tags/${item.router}`} key={index}>
                <div className="tags-item">{item.name}&nbsp;[&nbsp;{item.len}&nbsp;]</div>  
              </Link>
            ))}
          </Card>
        </div>
      </article>
    </>
  );
}
