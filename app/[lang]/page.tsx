import PaddingContainer from "@/components/layout/padding-container";
import PostCard from "@/components/post/post-card";
import PostList from "@/components/post/post-list";
import CTACard from "@/components/elements/cta-card";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/getDictionary";

export async function getAllPosts() {
  const res = await fetch("http://localhost:3000/api/posts");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  const posts: Post[] = await getAllPosts();

  if (!posts) {
    notFound();
  }

  const dictionary = await getDictionary(params.lang);

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard locale={params.lang} post={posts[0]} />
        <PostList
          locale={params.lang}
          posts={posts.filter((_post, index) => index > 0 && index < 3)}
        />
        <CTACard dictionary={dictionary} />
        <PostCard locale={params.lang} reverse post={posts[3]} />
        <PostList
          locale={params.lang}
          posts={posts.filter((_post, index) => index > 3 && index < 6)}
        />
      </main>
    </PaddingContainer>
  );
}
