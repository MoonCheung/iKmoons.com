import { Post } from '../layouts/Post';
import { getAllPosts } from './api/index';

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
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </>
  );
}
