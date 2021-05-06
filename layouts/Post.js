import Link from "next/link";
import { HeadPost } from "./HeadPost";
export const Post = ({ post }) => {
  return (
    <article>
      <HeadPost meta={post} />
      <Link href={"/article/" + post.route}>
        <a>Read more &rarr;</a>
      </Link>
      <style jsx>
        {`
          article {
            margin-bottom: 3rem;
          }
        `}
      </style>
    </article>
  );
};
