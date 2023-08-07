import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/layout/padding-container";
import PostList from "@/components/post/post-list";
import { getDictionary } from "@/lib/getDictionary";
import { Category } from "@/types/collection";
import { notFound } from "next/navigation";
import { cache } from "react";

// Get Category Data
export const getCategoryData = cache(async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/categories/${slug}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
});

// Generate Metadata Function
export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: { category: string; lang: string };
}) => {
  const categoryData = await getCategoryData(category);

  return {
    title: {
      absolute: categoryData?.title,
    },
    description: categoryData?.description,
    openGraph: {
      title: categoryData?.title,
      description: categoryData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}`,
      siteName: categoryData?.title,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/${category}/opengraph-image.png`,
      //     width: 1200,
      //     height: 628,
      //   },
      // ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/${category}`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/${category}`,
      },
    },
  };
};

export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:3000/api/categories");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const categories: Category[] = await res.json();

  const params = categories?.map((category) => {
    return {
      category: category.slug as string,
    };
  });

  return params || [];
};

const Page = async ({
  params,
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  const category: Category = await getCategoryData(params.category);

  if (!category) {
    notFound();
  }

  const posts = DUMMY_POSTS.filter(
    (post) => post.category.title.toLocaleLowerCase() === params.category
  );
  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold">{category?.title}</h1>
        <p className="text-lg text-neutral-600">{category?.description}</p>
      </div>
      <PostList locale={params.lang} posts={posts} />
    </PaddingContainer>
  );
};

export default Page;
