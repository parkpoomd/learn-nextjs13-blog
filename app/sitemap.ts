import { MetadataRoute } from "next";
import { getAllPosts } from "./[lang]/page";
import { getCategoryData } from "./[lang]/[category]/page";
import { Category, Post } from "@/types/collection";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL as string;

  // Get Posts
  const posts: Post[] = await getAllPosts();

  const postLinks = posts?.map((post) => {
    return [
      {
        url: `${baseURL}/en/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
      {
        url: `${baseURL}/de/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
      {
        url: `${baseURL}/blog/${post.slug}`,
        lastModified: new Date(post.date_updated),
      },
    ];
  });

  // Get Categories
  const res = await fetch("http://localhost:3000/api/categories");

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const categories: Category[] = await res.json();

  const categoryLinks = categories?.map((category) => {
    return [
      {
        url: `${baseURL}/en/${category.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseURL}/de/${category.slug}`,
        lastModified: new Date(),
      },
      {
        url: `${baseURL}/${category.slug}`,
        lastModified: new Date(),
      },
    ];
  });

  const dynamicLinks = postLinks.concat(categoryLinks ?? []).flat() ?? [];

  return [
    {
      url: baseURL,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/en`,
      lastModified: new Date(),
    },
    {
      url: `${baseURL}/de`,
      lastModified: new Date(),
    },
    ...dynamicLinks,
  ];
}
