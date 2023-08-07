import { DUMMY_CATEGORIES } from "@/DUMMY_DATA";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const category = DUMMY_CATEGORIES.find(
    (category) => category.slug === params.slug
  );

  return NextResponse.json(category);
}
