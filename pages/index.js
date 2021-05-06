import { Post } from "../layouts/Post";
import { getAllPosts } from "./api/index";

export async function getStaticProps() {
  const posts = await getAllPosts([
    'route',
    'title',
    'description',
    'date',
    'readTime'
  ])

  return {
    props:{
      posts
    }
  };
}

export default function IndexPage({posts}) {
  return (
    <>
      {posts.map((post,index) => (
        <Post post={post} key={index} />
      ))}
    </>
  );
}