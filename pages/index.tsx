import { Post } from '../layouts/Post';
import { getAllPosts } from './api/index';
import LevelCard from '../components/levelcard/index';
import { constant } from '../config/app.config';

// 该页面导出该方法返回props
export async function getStaticProps() {
  const posts = await getAllPosts(['route', 'title', 'description', 'createdAt']);

  return {
    props: {
      posts
    }
  };
}

export default function IndexPage({ posts }) {
  return (
    <>
      {/* {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))} */}
      <article className='container flex justify-start'>
        <div className='main-wrap'>
          <LevelCard posts={constant.catgIcon} />
        </div>
        <div className='aside'>b</div>
      </article>
    </>
  );
}
