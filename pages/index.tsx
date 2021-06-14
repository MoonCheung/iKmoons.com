import { Post } from '../layouts/Post';
import { getAllPosts } from './api/index';
import Card from '../components/card/index';
import MediaList from '../components/media/index';
import LevelCard from '../components/levelcard/index';
import { constant } from '../config/app.config';

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
    'origin'
  ]);

  return {
    props: {
      posts
    }
  };
}

export default function IndexPage({ posts }) {
  return (
    <>
      <article className='container flex justify-start'>
        <div className='main-wrap'>
          <LevelCard posts={constant.catgIcon} />
          <MediaList posts={posts} />
        </div>
        <div className='aside'>
          <Card icon='hot' title='热门文章'>
            <div className='card-item'>hello 嵌套组件1</div>
            <div className='card-item'>hello 嵌套组件2</div>
            <div className='card-item'>hello 嵌套组件3</div>
            <div className='card-item'>hello 嵌套组件4</div>
          </Card>
          <Card icon='tag' title='标签'>
            <div className='card-item'>hello 嵌套组件1</div>
            <div className='card-item'>hello 嵌套组件2</div>
            <div className='card-item'>hello 嵌套组件3</div>
            <div className='card-item'>hello 嵌套组件4</div>
          </Card>
        </div>
      </article>
    </>
  );
}
