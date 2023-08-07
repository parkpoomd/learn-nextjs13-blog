import { DUMMY_POSTS } from "@/DUMMY_DATA";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

  return NextResponse.json(post);
}
