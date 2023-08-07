import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./post-content";

interface PostCardProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
  locale: string;
}

const PostCard = ({
  post,
  layout = "horizontal",
  reverse = false,
  locale,
}: PostCardProps) => {
  return (
    <Link
      className={`@container ${
        layout === "horizontal"
          ? "grid grid-cols-1 items-center gap-10 md:grid-cols-2"
          : "space-y-10"
      }`}
      href={`/${locale}/post/${post.slug}`}
    >
      {/* Post Image */}
      <Image
        className={`h-full max-h-[300px] w-full rounded-md object-cover object-center ${
          reverse ? "md:order-last" : ""
        }`}
        alt={post.title}
        src={post.image}
        width={600}
        height={300}
      />
      {/* Post Content */}
      <PostContent locale={locale} post={post} />
    </Link>
  );
};

export default PostCard;
