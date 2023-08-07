import { notFound } from "next/navigation";
import PaddingContainer from "@/components/layout/padding-container";
import PostHero from "@/components/post/post-hero";
import PostBody from "@/components/post/post-body";
import SocialLink from "@/components/elements/social-link";
import CTACard from "@/components/elements/cta-card";
import { Post } from "@/types/collection";
import { cache } from "react";
import siteConfig from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";

export const getPostData = cache(async (slug: string) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
});

// Generate Metadata Function
export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: { slug: string; lang: string };
}) => {
  const postData = await getPostData(slug);

  return {
    title: postData?.title,
    description: postData?.description,
    openGraph: {
      title: postData?.title,
      description: postData?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      siteName: postData?.title,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}/opengraph-image.png`,
      //     width: 1200,
      //     height: 628,
      //   },
      // ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de/post/${slug}`,
      },
    },
  };
};

export const generateStaticParams = async () => {
  const res = await fetch("http://localhost:3000/api/posts");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const posts: Post[] = await res.json();

  const params = posts?.map((post) => {
    return {
      slug: post.slug as string,
    };
  });

  return params || [];
};

const Page = async ({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  const post: Post = await getPostData(params.slug);

  /* Structured Data for Google */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    image: `${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`,
    author: `${post.author.first_name} ${post.author.last_name}`,
    genre: post.category.title,
    publisher: siteConfig.siteName,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.lang}/post/${params.slug}/opengraph-image.png`,
    datePublished: new Date(post.date_created).toISOString(),
    dateCreated: new Date(post.date_created).toISOString(),
    dateModified: new Date(post.date_updated).toISOString(),
    description: post.description,
    articleBody: post.body,
  };

  if (!post) {
    notFound();
  }

  const dictionary = await getDictionary(params.lang);

  return (
    <PaddingContainer>
      {/* Add JSON-LD to your page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Container */}
      <div className="space-y-10">
        {/* Post Hero */}
        <PostHero locale={params.lang} post={post} />
        {/* Post Body and Social Share */}
        <div className="mt-10 flex flex-col gap-10 md:flex-row">
          <div className="relative">
            <div className="sticky top-20 flex items-center gap-5 md:flex-col">
              <div className="font-medium md:hidden">Share this content:</div>
              <SocialLink
                isShareURL
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${
                  `${process.env.NEXT_PUBLIC_SITE_URL}` + `/post/${post.slug}`
                }`}
              />
              <SocialLink
                isShareURL
                platform="twitter"
                link={`https://twitter.com/intent/tweet?url=${
                  `${process.env.NEXT_PUBLIC_SITE_URL}` + `/post/${post.slug}`
                }`}
              />
              <SocialLink
                isShareURL
                platform="linkedin"
                link={`https://www.linkedin.com/shareActicle?mini=true&url=${
                  `${process.env.NEXT_PUBLIC_SITE_URL}` + `/post/${post.slug}`
                }`}
              />
            </div>
          </div>
          <PostBody body={post.body} />
        </div>
        {/* CTA Card */}
        <CTACard dictionary={dictionary} />
      </div>
    </PaddingContainer>
  );
};

export default Page;
