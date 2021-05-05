import { Post } from "../layouts/Post";
import { posts } from "../getAllPosts";

export default function IndexPage() {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.link} post={post} />
      ))}
    </>
  );
}
