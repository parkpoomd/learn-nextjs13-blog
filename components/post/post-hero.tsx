import { Post } from "@/types/collection";
import PostContent from "@/components/post/post-content";
import Image from "next/image";

interface PostHeroProps {
  post: Post;
  locale: string;
}

const PostHero = ({ post, locale }: PostHeroProps) => {
  return (
    <div>
      <PostContent locale={locale} isPostPage post={post} />
      <Image
        className="h-[300px] rounded-md object-cover object-center md:h-[500px]"
        src={post.image}
        width={1280}
        height={500}
        alt={post.title}
      />
    </div>
  );
};

export default PostHero;
